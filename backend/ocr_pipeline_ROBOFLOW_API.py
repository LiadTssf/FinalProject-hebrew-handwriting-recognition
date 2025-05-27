# -*- coding: utf-8 -*-
# =====================================================================
# OCR PIPELINE MODULE (Roboflow for OCR + Gemini Correction)
# =====================================================================
# Uses Roboflow API for character recognition and Gemini for text correction.

import cv2
import numpy as np
import matplotlib.pyplot as plt
import sys
import io
import traceback
import os
import zipfile
from PIL import Image
from dotenv import load_dotenv

# Call load_dotenv() as early as possible
load_dotenv()
print(f"DEBUG (startup): ROBOFLOW_API_KEY from os.environ after load_dotenv: {os.getenv('ROBOFLOW_API_KEY')}")
print(f"DEBUG (startup): GEMINI_API_KEY from os.environ after load_dotenv: {os.getenv('GEMINI_API_KEY')}")


# --- Library Imports ---
# Roboflow SDK (Essential for this version)
try:
    from inference_sdk import InferenceHTTPClient
    # Import specific exceptions that exist in inference_sdk v0.49.5
    from inference_sdk.http.errors import HTTPClientError, APIKeyNotProvided, InvalidModelIdentifier, ModelNotSelectedError, HTTPCallErrorError
    # You can add more specific exceptions from inference_sdk.http.errors if needed
    print("INFO: inference_sdk components (InferenceHTTPClient and specific exceptions) imported successfully.")
except ImportError as e:
    print(f"FATAL ERROR: Could not import necessary components from 'inference_sdk'. Error: {e}")
    print("Please ensure 'inference_sdk' (around v0.49.5) is correctly installed in your environment.")
    sys.exit("Dependency issue with inference_sdk")

# Google Gemini SDK (Essential for this version)
try:
    import google.generativeai as genai
    print("INFO: google.generativeai imported successfully.")
except ImportError:
    print("FATAL ERROR: 'google-generativeai' not found. This library is essential for Gemini correction.")
    print("Please install it: pip install google-generativeai")
    sys.exit("Dependency missing: google-generativeai")

# --- Parameters ---
TARGET_HEIGHT_FIXED = 3000; TARGET_WIDTH_FIXED = 2000
LINE_REMOVAL_KERNEL_LENGTH_DIV = 30; VERTICAL_RECONNECT_KERNEL_HEIGHT = 5
PROJECTION_THRESHOLD_RATIO = 0.12; HPP_DENSITY_FILTER_RATIO = 0.5
LINE_CROP_PADDING = 5; BOUNDARY_EXTEND_RATIO = 0.3

RTL_ENABLED = True; MIN_CONTOUR_AREA_LETTER = 10; MAX_CONTOUR_AREA_LETTER = 8000
MIN_ASPECT_RATIO_LETTER = 0.05; MAX_ASPECT_RATIO_LETTER = 4.0
FILTER_TOP_FRAGMENTS = True; TOP_FRAGMENT_MAX_START_Y = 5; TOP_FRAGMENT_MAX_END_Y_RATIO = 0.4
MORPH_KERNEL_SIZE_LETTERS = 3; MIN_X_OVERLAP_RATIO_MERGE = 0.60; MAX_CENTER_X_DIFF_RATIO_MERGE = 0.7
PREVENT_LAMED_OVERHANG_MERGE = True; LAMED_CANDIDATE_MIN_HEIGHT_RATIO = 1.5
LAMED_CANDIDATE_MAX_WIDTH_RATIO = 0.7; EATEN_CHAR_MIN_WIDTH_RATIO_OF_LAMED = 0.4
SPACE_MULTIPLIER = 2.5; MIN_ABS_SPACE_WIDTH_RATIO = 0.4; LETTER_CROP_PADDING = 2

# --- Roboflow API Configuration ---
ROBOFLOW_API_KEY_FALLBACK = "YOUR_ROBOFLOW_PRIVATE_KEY_HERE"
ROBOFLOW_API_KEY = os.environ.get("ROBOFLOW_API_KEY", ROBOFLOW_API_KEY_FALLBACK)
ROBOFLOW_API_URL = "https://detect.roboflow.com"
ROBOFLOW_WORKSPACE_NAME = "digiktav"
ROBOFLOW_WORKFLOW_ID = "custom-workflow" # Make sure this is your project_id/version_number
ROBOFLOW_PREDICTION_PATH = [0, 'predictions', 'top']

print(f"DEBUG: ROBOFLOW_API_KEY being used: '{ROBOFLOW_API_KEY[:5]}...{ROBOFLOW_API_KEY[-5:] if ROBOFLOW_API_KEY and len(ROBOFLOW_API_KEY) > 10 else ''}'")
PLACEHOLDER_ROBOFLOW_KEYS = ["YOUR_ROBOFLOW_PRIVATE_KEY_HERE"]
if not ROBOFLOW_API_KEY or ROBOFLOW_API_KEY in PLACEHOLDER_ROBOFLOW_KEYS:
    print(f"WARNING: ROBOFLOW_API_KEY ('{ROBOFLOW_API_KEY}') appears to be a placeholder or is not set. Roboflow recognition will likely fail.")

# --- Gemini API Configuration ---
GEMINI_API_KEY_FALLBACK = "YOUR_GEMINI_API_KEY_HERE"
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", GEMINI_API_KEY_FALLBACK)
if not GEMINI_API_KEY or GEMINI_API_KEY == GEMINI_API_KEY_FALLBACK:
    print("WARNING: GEMINI_API_KEY not set or is placeholder. Gemini correction will be skipped.")

gemini_model_g = None
models_loaded_flag = False

# --- Debugging ---
DEBUG_VISUALIZE = False
DEBUG_OUTPUT_DIR = "debug_output"

# --- Hebrew Letter Mapping ---
HEBREW_MAP = {
    "0": "א", "1": "ב", "2": "ג", "3": "ד", "4": "ה", "5": "ו", "6": "ז", "7": "ח",
    "8": "ט", "9": "י", "10": "כ", "11": "ך", "12": "ל", "13": "מ", "14": "ם",
    "15": "נ", "16": "ן", "17": "ס", "18": "ע", "19": "פ", "20": "ף", "21": "צ",
    "22": "ץ", "23": "ק", "24": "ר", "25": "ש", "26": "ת",
    "01alef": "א", "02bet": "ב", "03gimel": "ג", "04dalet": "ד", "05he": "ה",
    "06vav": "ו", "07zayin": "ז", "08het": "ח", "09tet": "ט", "10yod": "י",
    "11kaf": "כ", "12kafsofit": "ך", "13lamed": "ל", "14mem": "מ", "15memsofit": "ם",
    "16nun": "נ", "17nunsofit": "ן", "18samekh": "ס", "19ayin": "ע", "20pe": "פ",
    "21pesofit": "ף", "22tsadi": "צ", "23tsadisofit": "ץ", "24kuf": "ק",
    "25resh": "ר", "26shin": "ש", "27tav": "ת"
}

# === HELPER FUNCTIONS ===
def ensure_debug_dir():
    if DEBUG_VISUALIZE and not os.path.exists(DEBUG_OUTPUT_DIR):
        try: os.makedirs(DEBUG_OUTPUT_DIR)
        except OSError as e: print(f"[Debug ERROR] Could not create {DEBUG_OUTPUT_DIR}: {e}"); return None
    return DEBUG_OUTPUT_DIR if DEBUG_VISUALIZE and os.path.exists(DEBUG_OUTPUT_DIR) else None

def save_debug_image(image_data, base_filename, line_idx=None, step_name=""):
    if not DEBUG_VISUALIZE: return
    output_dir = ensure_debug_dir()
    if not output_dir: return
    filename_parts = [os.path.basename(base_filename)]
    if line_idx is not None: filename_parts.append(f"L{line_idx+1:02d}")
    if step_name: filename_parts.append(step_name)
    filename = "_".join(filename_parts) + ".png"
    filepath = os.path.join(output_dir, filename)
    try:
        img_to_save = image_data.copy()
        if len(img_to_save.shape)==3 and img_to_save.shape[2]==1: img_to_save = cv2.cvtColor(img_to_save, cv2.COLOR_GRAY2BGR)
        if img_to_save.dtype != np.uint8:
            if np.max(img_to_save) <= 1.0 and np.min(img_to_save) >=0.0 :
                 img_to_save = (img_to_save * 255).astype(np.uint8)
            else:
                 img_to_save = np.clip(img_to_save,0,255).astype(np.uint8)
        cv2.imwrite(filepath, img_to_save)
    except Exception as e: print(f"  [Debug ERROR] Failed to save {filepath}: {e}")

def resize_to_fixed(img_color, target_w, target_h):
    original_height, original_width = img_color.shape[:2]
    if original_height == target_h and original_width == target_w: return img_color
    resized_img = cv2.resize(img_color, (target_w, target_h), interpolation=cv2.INTER_CUBIC)
    return resized_img

def merge_split_boxes_inline(boxes, avg_char_height):
    min_x_overlap_ratio = MIN_X_OVERLAP_RATIO_MERGE
    max_center_x_diff_ratio = MAX_CENTER_X_DIFF_RATIO_MERGE
    if len(boxes) < 2: return boxes
    merge_line_tolerance = max(5, avg_char_height * 0.5)
    merged_something_overall = True; current_boxes = list(boxes)
    merge_iterations = 0; MAX_MERGE_ITERATIONS = 10
    while merged_something_overall and merge_iterations < MAX_MERGE_ITERATIONS:
        merged_something_overall = False; processed_indices = set(); next_boxes = []
        current_boxes.sort(key=lambda b: (b[1], b[0]))
        indices_to_process = list(range(len(current_boxes)))
        for i in indices_to_process:
            if i in processed_indices: continue
            merged_box_candidate_coords = list(current_boxes[i]); merged_with_indices = {i}
            for j in range(len(current_boxes)):
                if i == j or j in processed_indices: continue
                box2_coords = current_boxes[j]
                x1, y1, w1, h1 = merged_box_candidate_coords; x2, y2, w2, h2 = box2_coords
                vertical_distance = max(0, y2 - (y1 + h1), y1 - (y2 + h2)); v_overlap = max(0, min(y1 + h1, y2 + h2) - max(y1, y2))
                if vertical_distance >= merge_line_tolerance and v_overlap < min(h1,h2) * 0.2: continue
                overlap_x_start = max(x1, x2); overlap_x_end = min(x1 + w1, x2 + w2); overlap_width = max(0, overlap_x_end - overlap_x_start)
                min_w_local = min(w1, w2) if w1 > 0 and w2 > 0 else 0; overlap_needed = (min_w_local * min_x_overlap_ratio)
                has_horizontal_overlap = (overlap_width > overlap_needed) if min_w_local > 0 else (overlap_width > 0)
                center1_x = x1 + w1 / 2.0; center2_x = x2 + w2 / 2.0; center_x_diff = abs(center1_x - center2_x)
                max_w_local = max(w1, w2) if w1 > 0 or w2 > 0 else 0; alignment_limit = (max_w_local * max_center_x_diff_ratio)
                is_center_aligned = (center_x_diff < alignment_limit) if max_w_local > 0 else True
                if has_horizontal_overlap and is_center_aligned:
                    prevent_this_merge = False
                    if RTL_ENABLED and PREVENT_LAMED_OVERHANG_MERGE:
                        box_L_coords, box_R_coords = (None, None)
                        if x1 > x2 : box_L_coords, box_R_coords = merged_box_candidate_coords, box2_coords
                        elif x2 > x1: box_L_coords, box_R_coords = box2_coords, merged_box_candidate_coords
                        if box_L_coords and box_R_coords and (box_L_coords[0] > box_R_coords[0]):
                            xl, yl, wl, hl = box_L_coords; xr, yr, wr, hr = box_R_coords
                            is_L_taller_shape = hl > (hr * LAMED_CANDIDATE_MIN_HEIGHT_RATIO) and wl <= (hl * LAMED_CANDIDATE_MAX_WIDTH_RATIO)
                            if is_L_taller_shape:
                                lamed_rtl_right_edge = xl - wl
                                is_R_under_L_span = xr < xl and xr > lamed_rtl_right_edge - wr*0.2
                                is_R_narrower = wr < wl * 0.8
                                y_condition = (yr >= yl - hr * 0.3) and (yr < yl + hl * 0.75)
                                if y_condition and is_R_under_L_span and is_R_narrower :
                                    if wr > wl * EATEN_CHAR_MIN_WIDTH_RATIO_OF_LAMED:
                                        prevent_this_merge = True
                    if not prevent_this_merge:
                        merged_x=min(x1,x2); merged_y=min(y1,y2); merged_w=max(x1+w1,x2+w2)-merged_x; merged_h=max(y1+h1,y2+h2)-merged_y
                        merged_box_candidate_coords=[merged_x,merged_y,merged_w,merged_h]; merged_with_indices.add(j); merged_something_overall=True
            next_boxes.append(tuple(merged_box_candidate_coords)); processed_indices.update(merged_with_indices)
        current_boxes = next_boxes; merge_iterations += 1
        if merge_iterations == MAX_MERGE_ITERATIONS and merged_something_overall:
            if DEBUG_VISUALIZE: print("[C-WARN] Reached max merge iterations.")
    return current_boxes

def segment_image_to_lines(img_color_input, base_filename="input_image"):
    line_crops = []
    base_fn_for_debug = os.path.splitext(base_filename)[0]
    try:
        img_color = img_color_input
        if img_color is None: raise ValueError("Input image is None.")
        img_height, img_width = img_color.shape[:2]
        img_gray = cv2.cvtColor(img_color, cv2.COLOR_BGR2GRAY)
        _, img_binary_orig = cv2.threshold(img_gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        save_debug_image(img_binary_orig, base_fn_for_debug, step_name="L0_InitialBinary")
        line_kernel_len = max(15, img_width // LINE_REMOVAL_KERNEL_LENGTH_DIV)
        horizontal_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (line_kernel_len, 1))
        img_opened = cv2.morphologyEx(img_binary_orig, cv2.MORPH_OPEN, horizontal_kernel, iterations=1)
        img_no_lines = cv2.subtract(img_binary_orig, img_opened)
        save_debug_image(img_no_lines, base_fn_for_debug, step_name="L1_AfterLineRemoval")
        img_for_hpp = img_no_lines.copy()
        if VERTICAL_RECONNECT_KERNEL_HEIGHT > 0:
            reconnect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (1, VERTICAL_RECONNECT_KERNEL_HEIGHT))
            img_for_hpp = cv2.morphologyEx(img_for_hpp, cv2.MORPH_CLOSE, reconnect_kernel)
            save_debug_image(img_for_hpp, base_fn_for_debug, step_name="L2_AfterVReconnect")
        horizontal_projection = np.sum(img_for_hpp, axis=1)
        max_proj_val = np.max(horizontal_projection); threshold = 0
        if max_proj_val > 0:
             threshold = max_proj_val * PROJECTION_THRESHOLD_RATIO
        if DEBUG_VISUALIZE and 'matplotlib' in sys.modules:
            plt.figure(figsize=(12, max(6, img_height / 40)))
            plt.plot(horizontal_projection, range(img_height))
            plt.gca().invert_yaxis(); plt.title(f"HPP for {base_fn_for_debug} (After Line Removal & Reconnect)")
            plt.xlabel("Sum of White Pixels"); plt.ylabel("Row Number (Y)")
            if max_proj_val > 0:
                 plt.plot([threshold, threshold], [0, img_height], color='r', linestyle='--', lw=1, label=f'Threshold ({threshold:.1f})')
            plt.legend(); plt.grid(True)
            debug_dir_path = ensure_debug_dir()
            if debug_dir_path:
                hpp_filepath = os.path.join(debug_dir_path, f"{base_fn_for_debug}_L3_HPP_Plot.png")
                try: plt.savefig(hpp_filepath)
                except Exception as e_save: print(f"  [L-ERROR] Failed to save HPP plot {hpp_filepath}: {e_save}")
            plt.close()
        if max_proj_val == 0: return []
        in_line = False; initial_segments_raw = []; start_y = 0
        for y in range(img_height):
            if horizontal_projection[y] > threshold and not in_line: in_line = True; start_y = y
            elif horizontal_projection[y] <= threshold and in_line:
                in_line = False; end_y = y
                if end_y > start_y:
                    initial_segments_raw.append({'start_raw': start_y, 'end_raw': end_y, 'hpp_sum': np.sum(horizontal_projection[start_y:end_y])})
        if in_line:
            end_y = img_height
            if end_y > start_y:
                 initial_segments_raw.append({'start_raw': start_y, 'end_raw': end_y, 'hpp_sum': np.sum(horizontal_projection[start_y:end_y])})
        if not initial_segments_raw: return []
        avg_line_height_raw = sum(s['end_raw'] - s['start_raw'] for s in initial_segments_raw) / len(initial_segments_raw) if initial_segments_raw else 30
        min_sensible_height = max(8, avg_line_height_raw * 0.25)
        avg_hpp_sum_per_pixel_height = 0
        if initial_segments_raw:
            total_hpp_sum_for_avg = sum(s['hpp_sum'] for s in initial_segments_raw)
            total_height_sum_for_avg = sum(s['end_raw'] - s['start_raw'] for s in initial_segments_raw if (s['end_raw'] - s['start_raw']) > 0)
            if total_height_sum_for_avg > 0:
                avg_hpp_sum_per_pixel_height = total_hpp_sum_for_avg / total_height_sum_for_avg
        min_sensible_hpp_density = avg_hpp_sum_per_pixel_height * HPP_DENSITY_FILTER_RATIO
        filtered_segments = []
        for seg in initial_segments_raw:
            height = seg['end_raw'] - seg['start_raw']
            hpp_density_this_seg = 0
            if height > 0: hpp_density_this_seg = seg['hpp_sum'] / height
            passes_height_filter = height >= min_sensible_height
            passes_density_filter = True
            if avg_hpp_sum_per_pixel_height > 0.01 : passes_density_filter = hpp_density_this_seg >= min_sensible_hpp_density
            if passes_height_filter and passes_density_filter:
                filtered_segments.append(seg)
        initial_segments = filtered_segments
        if not initial_segments: return []
        avg_line_height = sum(s['end_raw'] - s['start_raw'] for s in initial_segments) / len(initial_segments) if initial_segments else 30
        adjusted_segments = []
        num_segments = len(initial_segments)
        for i in range(num_segments):
            current_seg = initial_segments[i].copy()
            adjusted_start = current_seg['start_raw']; adjusted_end = current_seg['end_raw']
            curr_start_raw = current_seg['start_raw']; curr_end_raw = current_seg['end_raw']
            if i > 0:
                prev_seg = initial_segments[i-1]; prev_end_raw = prev_seg['end_raw']
                if curr_start_raw > prev_end_raw: adjusted_start = prev_end_raw + (curr_start_raw - prev_end_raw) // 2
            if i < num_segments - 1:
                next_seg = initial_segments[i+1]; next_start_raw = next_seg['start_raw']
                if next_start_raw > curr_end_raw: adjusted_end = curr_end_raw + (next_start_raw - curr_end_raw) // 2
            current_seg['start_adj'] = adjusted_start; current_seg['end_adj'] = adjusted_end
            adjusted_segments.append(current_seg)
        final_adjusted_segments = []
        boundary_extension_amount = int(avg_line_height * BOUNDARY_EXTEND_RATIO) if avg_line_height > 0 else int(20 * BOUNDARY_EXTEND_RATIO)
        for i, seg in enumerate(adjusted_segments):
            current_final_seg = seg.copy()
            final_start, final_end = seg['start_adj'], seg['end_adj']
            if i == 0: final_start = max(0, seg['start_adj'] - boundary_extension_amount)
            if i == num_segments - 1: final_end = min(img_height, seg['end_adj'] + boundary_extension_amount)
            current_final_seg['start_final'] = final_start; current_final_seg['end_final'] = final_end
            final_adjusted_segments.append(current_final_seg)
        for i, seg in enumerate(final_adjusted_segments):
            crop_y_start = max(0, seg['start_final'] - LINE_CROP_PADDING)
            crop_y_max = min(img_height, seg['end_final'] + LINE_CROP_PADDING)
            line_crop = None
            if crop_y_max > crop_y_start:
                line_crop = img_gray[crop_y_start:crop_y_max, :]
                if line_crop.size > 0:
                    line_crops.append(line_crop)
        if DEBUG_VISUALIZE:
            img_lines_drawn = cv2.cvtColor(img_for_hpp, cv2.COLOR_GRAY2BGR)
            for i, seg_draw in enumerate(final_adjusted_segments):
                s, e = seg_draw['start_final'], seg_draw['end_final']
                color = (0, 255, 0) if i % 2 == 0 else (0, 0, 255)
                cv2.line(img_lines_drawn, (0, s), (img_width, s), color, 1)
                cv2.line(img_lines_drawn, (0, e), (img_width, e), color, 1)
                cv2.putText(img_lines_drawn, f"L{i+1}", (5, s + 15 if s + 15 < e else (s+e)//2), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 1)
            save_debug_image(img_lines_drawn, base_fn_for_debug, step_name="L4_FinalHPPLinesOnImage")
        return line_crops
    except Exception as e:
        print(f"\n[L-ERROR] Error in line segmentation for {base_fn_for_debug}: {e}")
        traceback.print_exc(); return None

def segment_line_to_items(line_image_gray, line_index, base_filename="input_image"):
    base_fn_for_debug = os.path.splitext(base_filename)[0]
    output_items = []
    if line_image_gray is None or line_image_gray.size == 0: return []
    line_h_orig, line_w_orig = line_image_gray.shape[:2]
    try:
        line_thresh_val, line_binary = cv2.threshold(line_image_gray, 0, 255, cv2.THRESH_BINARY_INV + cv2.THRESH_OTSU)
        save_debug_image(line_binary, base_fn_for_debug, line_idx=line_index, step_name="C0_LineBinary")
        img_for_contours = line_binary.copy()
        if MORPH_KERNEL_SIZE_LETTERS > 0:
            kernel = np.ones((MORPH_KERNEL_SIZE_LETTERS, MORPH_KERNEL_SIZE_LETTERS), np.uint8)
            img_for_contours = cv2.morphologyEx(line_binary, cv2.MORPH_CLOSE, kernel)
            save_debug_image(img_for_contours, base_fn_for_debug, line_idx=line_index, step_name="C1_LineClosed")
        contours, hierarchy = cv2.findContours(img_for_contours.copy(), cv2.RETR_CCOMP, cv2.CHAIN_APPROX_SIMPLE)
        if hierarchy is None: hierarchy = np.array([[[-1,-1,-1,-1]]])
        elif len(contours) > 0 and hierarchy.ndim == 3 and hierarchy.shape[1] != len(contours):
             hierarchy = hierarchy[:, :len(contours), :] if hierarchy.shape[1] > len(contours) else hierarchy
        initial_boxes = []
        line_color_copy_filt = None
        if DEBUG_VISUALIZE: line_color_copy_filt = cv2.cvtColor(line_image_gray, cv2.COLOR_GRAY2BGR)
        if contours and len(hierarchy) > 0 and hierarchy.ndim == 3 :
            for i_contour, contour in enumerate(contours):
                 if i_contour >= hierarchy.shape[1]: continue
                 parent_index = hierarchy[0][i_contour][3]; is_inner = (parent_index != -1)
                 area = cv2.contourArea(contour); x, y, w, h = cv2.boundingRect(contour)
                 aspect_ratio = w / float(h) if h > 0 else 0
                 filter_reason = ""
                 if FILTER_TOP_FRAGMENTS:
                     if y <= TOP_FRAGMENT_MAX_START_Y and (y + h) < (line_h_orig * TOP_FRAGMENT_MAX_END_Y_RATIO):
                         filter_reason = f"Top Fragment"
                 if not filter_reason:
                     if is_inner: filter_reason = "Inner Contour"
                     elif w <= 1 or h <= 1: filter_reason = "Too Small (W/H)"
                     elif not (MIN_CONTOUR_AREA_LETTER <= area <= MAX_CONTOUR_AREA_LETTER): filter_reason = f"Area"
                     elif not (MIN_ASPECT_RATIO_LETTER <= aspect_ratio <= MAX_ASPECT_RATIO_LETTER): filter_reason = f"Aspect Ratio"
                 if not filter_reason:
                     initial_boxes.append((x, y, w, h))
                     if DEBUG_VISUALIZE and line_color_copy_filt is not None: cv2.rectangle(line_color_copy_filt, (x,y), (x+w,y+h), (0,255,0),1)
                 elif DEBUG_VISUALIZE and line_color_copy_filt is not None:
                     cv2.rectangle(line_color_copy_filt, (x,y), (x+w,y+h), (0,0,255),1)
            save_debug_image(line_color_copy_filt, base_fn_for_debug, line_idx=line_index, step_name="C2_InitialFilteredContours")
        if not initial_boxes: return []
        avg_height = np.mean([b[3] for b in initial_boxes]) if initial_boxes else 10
        avg_width = np.mean([b[2] for b in initial_boxes]) if initial_boxes else 10
        avg_height = max(5, avg_height); avg_width = max(1, avg_width)
        initial_boxes.sort(key=lambda b: b[0], reverse=RTL_ENABLED)
        merged_boxes = merge_split_boxes_inline(initial_boxes, avg_height)
        merged_boxes.sort(key=lambda b: b[0], reverse=RTL_ENABLED)
        final_boxes_tuples = merged_boxes
        if DEBUG_VISUALIZE:
            line_final_boxes_img = cv2.cvtColor(line_image_gray, cv2.COLOR_GRAY2BGR)
            for box_idx, (x, y, w, h) in enumerate(final_boxes_tuples):
                 cv2.rectangle(line_final_boxes_img, (x, y), (x + w, y + h), (255, 0, 0), 2)
                 cv2.putText(line_final_boxes_img, str(box_idx+1), (x, y - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.4, (255,0,0), 1)
            save_debug_image(line_final_boxes_img, base_fn_for_debug, line_idx=line_index, step_name="C3_FinalLetterBoxes")
        if not final_boxes_tuples: return []
        gaps = []
        for i_gap in range(len(final_boxes_tuples) - 1):
            x1,_,w1,_=final_boxes_tuples[i_gap]; x2,_,w2,_=final_boxes_tuples[i_gap+1]; gap = (x1-(x2+w2)) if RTL_ENABLED else (x2-(x1+w1))
            if gap > 0: gaps.append(gap)
        min_abs_space_width = avg_width * MIN_ABS_SPACE_WIDTH_RATIO; space_threshold = float('inf')
        if gaps:
            median_gap = np.median(gaps); median_gap = max(median_gap, 1.0)
            calculated_threshold = median_gap * SPACE_MULTIPLIER
            space_threshold = max(calculated_threshold, min_abs_space_width)
        else: space_threshold = min_abs_space_width
        for i_item, (x,y,w,h) in enumerate(final_boxes_tuples):
            crop_y_s=max(0,y-LETTER_CROP_PADDING); crop_y_m=min(line_h_orig,y+h+LETTER_CROP_PADDING)
            crop_x_s=max(0,x-LETTER_CROP_PADDING); crop_x_m=min(line_w_orig,x+w+LETTER_CROP_PADDING)
            letter_crop = None
            if crop_y_m > crop_y_s and crop_x_m > crop_x_s:
                letter_crop = line_image_gray[crop_y_s:crop_y_m, crop_x_s:crop_x_m]
                if letter_crop.size > 0: output_items.append(('char',letter_crop))
                else: output_items.append(('error',None))
            else: output_items.append(('error',None))
            if i_item < len(final_boxes_tuples)-1:
                x1s,_,w1s,_=final_boxes_tuples[i_item]; x2s,_,w2s,_=final_boxes_tuples[i_item+1]
                gap_s=(x1s-(x2s+w2s)) if RTL_ENABLED else (x2s-(x1s+w1s))
                if gap_s > space_threshold: output_items.append(('space',None))
        return output_items
    except Exception as e:
        print(f"[C-ERROR] Error in letter segmentation for line {line_index + 1} ({base_fn_for_debug}): {e}")
        traceback.print_exc(); return []

# === MODEL LOADING (Now primarily for Gemini) ===
def load_models():
    global gemini_model_g, models_loaded_flag
    if models_loaded_flag: return True
    print("[OCR Pipeline INFO] Initializing models...")
    if not GEMINI_API_KEY or GEMINI_API_KEY == GEMINI_API_KEY_FALLBACK:
        print("  Gemini API Key not set or is placeholder. Gemini model will not be loaded.")
    else:
        try:
            print("  Configuring Gemini API...")
            genai.configure(api_key=GEMINI_API_KEY)
            gemini_model_g = genai.GenerativeModel("models/gemini-1.5-flash-latest")
            print("  Gemini API configured and model loaded (gemini-1.5-flash-latest).")
        except Exception as e:
            print(f"  Error configuring Gemini: {e}")
            traceback.print_exc()
            gemini_model_g = None
    models_loaded_flag = True
    return True

# === CHARACTER RECOGNITION (Roboflow) ===
def recognize_text_roboflow(items_list):
    print(f"DEBUG: Entering recognize_text_roboflow. ROBOFLOW_API_KEY is: '{ROBOFLOW_API_KEY[:5]}...{ROBOFLOW_API_KEY[-5:] if ROBOFLOW_API_KEY and len(ROBOFLOW_API_KEY) > 10 else ''}'")
    if not items_list:
        print("DEBUG: recognize_text_roboflow returning None due to empty items_list.")
        return None
    if not ROBOFLOW_API_KEY or ROBOFLOW_API_KEY in PLACEHOLDER_ROBOFLOW_KEYS:
         print(f"[R-ERROR] Roboflow API Key ('{ROBOFLOW_API_KEY}') is a placeholder or default. Cannot proceed with Roboflow API calls.")
         return None
    try:
        print(f"DEBUG: Initializing InferenceHTTPClient with api_url='{ROBOFLOW_API_URL}', api_key='***', workspace='{ROBOFLOW_WORKSPACE_NAME}', workflow_id='{ROBOFLOW_WORKFLOW_ID}'")
        client = InferenceHTTPClient(api_url=ROBOFLOW_API_URL, api_key=ROBOFLOW_API_KEY)
        print("DEBUG: InferenceHTTPClient initialized successfully.")
    except ConnectionError as ce:
        print(f"\n[R-ERROR] CONNECTION FAILED to Roboflow API at {ROBOFLOW_API_URL}. Details: {ce}")
        return None
    except Exception as e: # Catch any exception during client init
        print(f"[R-ERROR] Failed to initialize Roboflow client: {e}")
        traceback.print_exc()
        return None

    recognized_text = ""
    item_count = len(items_list)
    for i, (item_type, item_data) in enumerate(items_list):
        if item_type == 'char':
            if item_data is None or item_data.size == 0:
                recognized_text += "?"
                continue
            try:
                if item_data.dtype != np.uint8:
                    item_data = (item_data * 255 if item_data.max() <= 1.0 else item_data).astype(np.uint8)
                img_final_np = cv2.cvtColor(item_data, cv2.COLOR_GRAY2BGR) if len(item_data.shape) == 2 else item_data
                
                result = client.run_workflow(
                    workspace_name=ROBOFLOW_WORKSPACE_NAME,
                    workflow_id=ROBOFLOW_WORKFLOW_ID,
                    images={"image": img_final_np },
                    use_cache=True # Can be False for debugging
                )
                
                prediction_val = result
                for key_path_item in ROBOFLOW_PREDICTION_PATH:
                    if isinstance(prediction_val, dict) and key_path_item in prediction_val: prediction_val = prediction_val[key_path_item]
                    elif isinstance(prediction_val, list) and isinstance(key_path_item, int) and key_path_item < len(prediction_val): prediction_val = prediction_val[key_path_item]
                    else: prediction_val = "?"; break
                final_char = HEBREW_MAP.get(str(prediction_val), "?")
                recognized_text += final_char
            # Updated exception handling based on inference_sdk.http.errors
            except APIKeyNotProvided as api_key_e:
                print(f"\n[R-ERROR] Roboflow API Key Not Provided for item {i+1}: {api_key_e}")
                return None # Critical error, stop processing
            except InvalidModelIdentifier as model_id_e:
                print(f"\n[R-ERROR] Roboflow Invalid Model Identifier for item {i+1} (workflow_id='{ROBOFLOW_WORKFLOW_ID}'): {model_id_e}")
                return None # Critical error
            except ModelNotSelectedError as model_select_e:
                print(f"\n[R-ERROR] Roboflow Model Not Selected for item {i+1}: {model_select_e}")
                return None # Critical error
            except HTTPCallErrorError as http_call_e: # Catches errors from API calls (like 401, 403, 404, 500s)
                print(f"\n[R-ERROR] Roboflow HTTP Call Error for item {i+1}: Status {http_call_e.status_code}, API Msg: {http_call_e.api_message}, Desc: {http_call_e.description}")
                if http_call_e.status_code in [401, 403]: # Unauthorized or Forbidden
                    print("DEBUG: Roboflow authentication error (401/403). API Key is likely invalid or lacks permissions for this model/workspace.")
                    return None
                recognized_text += "RF_HTTP_ERR" # Add a marker for this specific item
            except HTTPClientError as http_client_e: # General HTTP client error
                print(f"\n[R-ERROR] Roboflow HTTP Client Error for item {i+1}: {http_client_e}")
                recognized_text += "RF_CLIENT_ERR"
            except ConnectionError as ce: # Network-level connection errors
                print(f"\n[R-ERROR] Roboflow connection lost during API call: {ce}");
                return None # Critical, stop processing
            except Exception as e: # Catch-all for other unexpected errors during the loop
                print(f"\n[R-ERROR] Unexpected error during Roboflow API call/processing for item {i+1}: {e}")
                traceback.print_exc()
                recognized_text += "?"
        elif item_type == 'space': recognized_text += " "
        elif item_type == 'newline': recognized_text += "\n"
        elif item_type == 'error': recognized_text += "?"
    return recognized_text

# === GEMINI TEXT CORRECTION ===
def correct_text_gemini(ocr_text):
    print("\nOCR text BEFORE Gemini correction:\n" + ocr_text)
    global gemini_model_g
    if gemini_model_g is None:
        print("[Gemini] Model not loaded. Skipping correction.")
        return ocr_text
    if not ocr_text.strip():
        print("[Gemini] No text to correct.")
        return ocr_text
    prompt = f"""The following Hebrew text is a result of an OCR system recognizing handwritten Hebrew sentences. The OCR system has ~75% character accuracy. Common recognition mistakes include:
- 'ו' mistaken as 'י'
- 'נ' confused with 'כ'
- 'ר' and 'פ' are often swapped
- 'ת' and 'ט' sometimes confused
- Missing or extra letters in words
- Incorrect or missing spaces

**Specific OCR Error Patterns to Watch For Regarding Lamed (ל) and Tet (ט):**
1.  **Lamed (ל) Overhang:** The letter Lamed (ל) is tall, and its top part often extends to the left (in Right-to-Left text) over the subsequent character. The OCR system might:
    *   Incorrectly merge the Lamed and the character to its right into a single recognized character. For example, the OCR might output "ל" when the actual text was "לא" (Lamed-Alef) or "לפ" (Lamed-Peh).
    *   Sometimes, such a merged "Lamed + letter" combination might be misrecognized as a "ט" (Tet).
    *   The OCR might correctly recognize the Lamed but fail to recognize the character positioned visually under its overhang.
2.  **Tet (ט) Confusion:** A standalone Tet (ט) might occasionally be misrecognized as a Lamed (ל), or a Lamed as a Tet, especially if the handwriting is ambiguous for these shapes.

Your task:
- Correct **individual character-level OCR errors** using context and common Modern Hebrew language patterns.
- **Critically evaluate occurrences of "ל" or "ט":**
    - If a "ל" appears and the word seems incomplete or incorrect, consider if it should be "ל" followed by another letter (e.g., "לא", "לב", "לי", "לפ", etc.) that might have been "eaten" by the Lamed's bounding box during OCR.
    - If a "ט" appears and looks out of place, consider if it might be a misrecognized "ל" or a "ל + letter" combination.
    - Conversely, if a "ל" looks incorrect, consider if it should be a "ט".
    - If a character seems to be missing after a "ל", try to infer it based on context, assuming it might have been obscured by the Lamed's overhang.
- You must preserve every word unless it is clearly a misrecognized Hebrew word that can be corrected.
- If a word appears distorted or partially correct, attempt to fix it to the most plausible Hebrew word without removing or skipping it.
- Avoid removing any word entirely unless it is completely unreadable. Keep all lines and sentence lengths close to the original.
- **Avoid paraphrasing**, summarizing, or substituting words with semantically similar alternatives.
- **Crucially, the final corrected text should NOT contain any Hebrew vowel points (nikkud). Remove all existing nikkud and do not add any new nikkud.**
- Do **not** merge or split sentences unless the original OCR output structure is clearly broken and a merge/split is necessary for readability.
- Fix spelling, spacing, and punctuation based on Modern Hebrew rules.
- Your goal is **not to summarize or rephrase**, but to correct characters **within the original words and layout, maintaining the original intent as much as possible.**
- Only make changes when you are reasonably certain of the intended word.
- Favor minimal, targeted edits over rewriting entire phrases.
Only output the corrected text in Hebrew. Do not explain anything.
Fix the following OCR output:
{ocr_text}"""
    try:
        print("[Gemini] Sending text to Gemini for correction...")
        response = gemini_model_g.generate_content(prompt)
        print("[Gemini] Received correction from Gemini.")
        return response.text
    except Exception as e:
        print(f"[Gemini ERROR] {e}"); traceback.print_exc(); return ocr_text

# === MAIN OCR PIPELINE FUNCTION ===
def process_image_pipeline(image_bytes_content, original_filename="uploaded_image"):
    print(f"\n[OCR Pipeline] Starting full processing for: {original_filename}")
    if not models_loaded_flag:
        load_models()

    nparr = np.frombuffer(image_bytes_content, np.uint8)
    img_color_orig = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    if img_color_orig is None: return "Error: Could not decode image."

    img_color_resized = resize_to_fixed(img_color_orig, TARGET_WIDTH_FIXED, TARGET_HEIGHT_FIXED)
    save_debug_image(img_color_resized, original_filename, step_name="ResizedInput")

    line_images_gray = segment_image_to_lines(img_color_resized, base_filename=original_filename)
    if line_images_gray is None or not line_images_gray:
        return "Error: No lines found in image or line segmentation failed."

    all_output_items_from_segmentation = []
    for line_idx, line_img in enumerate(line_images_gray):
        items_in_line = segment_line_to_items(line_img, line_idx, base_filename=original_filename)
        if items_in_line: all_output_items_from_segmentation.extend(items_in_line)
        if line_idx < len(line_images_gray) - 1:
            all_output_items_from_segmentation.append(('newline', None))

    if DEBUG_VISUALIZE:
        display_output_items_with_newlines(all_output_items_from_segmentation, rtl=RTL_ENABLED, base_filename=original_filename)

    print("[OCR Pipeline] Performing character recognition using Roboflow API...")
    ocr_text_from_roboflow = recognize_text_roboflow(all_output_items_from_segmentation)

    if ocr_text_from_roboflow is None:
        print("[OCR Pipeline ERROR] Roboflow character recognition failed critically.")
        return "Error: Character recognition with Roboflow failed."
    print(f"[OCR Pipeline] Text from Roboflow: \n{ocr_text_from_roboflow}")

    final_corrected_text = correct_text_gemini(ocr_text_from_roboflow)

    print(f"[OCR Pipeline] Processing finished for {original_filename}.")
    return final_corrected_text

# --- Optional Display Function for Segmented Items ---
def display_output_items_with_newlines(output_items_list, rtl=False, base_filename=""):
    if not DEBUG_VISUALIZE or not output_items_list: return
    num_items = len(output_items_list); cols = min(num_items, 35); rows = (num_items + cols - 1) // cols
    plt.figure(figsize=(cols * 0.5, rows * 0.8))
    for i, (item_type, item_data) in enumerate(output_items_list):
        current_row = i // cols; position_in_row_ltr = i % cols
        subplot_position = (current_row * cols + (cols - 1 - position_in_row_ltr if rtl else position_in_row_ltr)) + 1
        try:
            ax = plt.subplot(rows, cols, subplot_position)
            if item_type == 'char':
                if item_data is not None and item_data.size > 0: plt.imshow(item_data, cmap='gray', vmin=0, vmax=255)
                else: plt.text(0.5, 0.5, 'Err', ha='center', va='center', fontsize=8)
            elif item_type == 'space': ax.set_facecolor('#e0e0e0'); plt.text(0.5, 0.5, '[SP]', ha='center', va='center', fontsize=8, color='black')
            elif item_type == 'newline': ax.set_facecolor('#c0c0ff'); plt.text(0.5, 0.5, '[NL]', ha='center', va='center', fontsize=8, color='blue')
            elif item_type == 'error': ax.set_facecolor('pink'); plt.text(0.5, 0.5, '[ERR]', ha='center', va='center', fontsize=8, color='red')
            plt.axis('off')
        except ValueError as ve: print(f"Subplot Error {subplot_position}: {ve}"); continue
    plt.tight_layout(pad=0.1, h_pad=0.2, w_pad=0.1)
    plt.suptitle(f"Segmented Items for {os.path.basename(base_filename)}")
    debug_dir_path = ensure_debug_dir()
    if debug_dir_path:
        plot_filepath = os.path.join(debug_dir_path, f"{os.path.splitext(os.path.basename(base_filename))[0]}_SegmentedItemsPlot.png")
        try: plt.savefig(plot_filepath)
        except Exception as e_save: print(f"  [Plot Save ERROR] Failed to save segmented items plot {plot_filepath}: {e_save}")
    plt.close()

# --- Main Execution Block for Testing ---
if __name__ == '__main__':
    DEBUG_VISUALIZE = True # <<--- SET TO TRUE TO SAVE DEBUG IMAGES AND PLOTS
    print(f"Running ocr_pipeline.py directly (DEBUG_VISUALIZE = {DEBUG_VISUALIZE})...")

    if DEBUG_VISUALIZE:
        if not os.path.exists(DEBUG_OUTPUT_DIR):
            try: os.makedirs(DEBUG_OUTPUT_DIR); print(f"Created debug directory: {DEBUG_OUTPUT_DIR}")
            except OSError as e: print(f"ERROR: Could not create {DEBUG_OUTPUT_DIR}: {e}")

    test_image_path = './test_images/text1.jpg'
    if not os.path.exists(test_image_path):
        print(f"ERROR: Test image not found at '{test_image_path}'")
        sys.exit(1)

    print(f"Loading test image: {test_image_path}")
    with open(test_image_path, 'rb') as f: test_image_bytes = f.read()

    result_text = process_image_pipeline(test_image_bytes, original_filename=os.path.basename(test_image_path))

    print("\n==============================\n=== Final Corrected Text ===\n==============================")
    print(result_text)
    print("\n==============================")

    if DEBUG_VISUALIZE:
        print(f"\nDebug image saving attempted. Check '{os.path.abspath(DEBUG_OUTPUT_DIR)}'")
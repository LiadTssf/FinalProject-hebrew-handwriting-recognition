FROM python:3.10-slim
WORKDIR /app

# Install system dependencies, including unzip
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        libgl1-mesa-glx \
        libglib2.0-0 \
        unzip \
    && rm -rf /var/lib/apt/lists/*

COPY ./requirements.txt /app/requirements.txt
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r /app/requirements.txt

COPY ./main.py /app/main.py
COPY ./ocr_pipeline.py /app/ocr_pipeline.py

# Copy the zip file and then unzip it
COPY ./vit-hebrew-final.zip /app/vit-hebrew-final.zip
RUN unzip /app/vit-hebrew-final.zip -d /app/ && \
    rm /app/vit-hebrew-final.zip && \
    echo "--- Contents of /app/ after unzip ---" && \
    ls -la /app/ && \
    echo "--- Contents of /app/vit-hebrew-final/ after unzip ---" && \
    ls -la /app/vit-hebrew-final/ # Verify contents

ENV PORT=8000
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
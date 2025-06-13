# PowerShell deployment script for Digi-Ktav backend
# Run this from the backend directory: .\deploy.ps1
# At the very top of deploy.ps1
$env:GEMINI_API_KEY = "AIzaSyBqo65S4Rr8Ywl6p0yQRfxZBajBJr7fM2g"
Write-Host "✅ Set GEMINI_API_KEY in script scope" -ForegroundColor Green
# Configuration - UPDATE THESE VALUES
$PROJECT_ID = "digi-ktav-ocr-project"
$REGION = "me-west1"
$REPO_NAME = "digiktav-repo"
$IMAGE_NAME = "digiktav-backend"
$SERVICE_NAME = "digiktav-backend-service"
Write-Host "Debug: GEMINI_API_KEY = '$env:GEMINI_API_KEY'" -ForegroundColor Magenta

# Get Gemini API key from user if not set in environment
Write-Host "Checking for GEMINI_API_KEY environment variable..." -ForegroundColor Blue
Write-Host "Current value: '$env:GEMINI_API_KEY'" -ForegroundColor Magenta

if ([string]::IsNullOrEmpty($env:GEMINI_API_KEY)) {
    Write-Host "GEMINI_API_KEY not found in environment, asking for input..." -ForegroundColor Yellow
    $GEMINI_API_KEY = Read-Host "Enter your Gemini API Key"
    if ([string]::IsNullOrEmpty($GEMINI_API_KEY)) {
        Write-Host "No API key provided. Exiting..." -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "✅ Found GEMINI_API_KEY in environment!" -ForegroundColor Green
    $GEMINI_API_KEY = $env:GEMINI_API_KEY
}

Write-Host "Using API key: $($GEMINI_API_KEY.Substring(0,20))..." -ForegroundColor Green

Write-Host "Starting deployment process..." -ForegroundColor Green

# Step 1: Build and push image to Artifact Registry
Write-Host "Building and pushing Docker image..." -ForegroundColor Yellow
$imageUrl = "$REGION-docker.pkg.dev/$PROJECT_ID/$REPO_NAME/${IMAGE_NAME}:latest"

try {
    gcloud builds submit --tag $imageUrl .
    Write-Host "Image built and pushed successfully" -ForegroundColor Green
} catch {
    Write-Host "Failed to build/push image: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 2: Deploy to Cloud Run
Write-Host "Deploying to Cloud Run..." -ForegroundColor Yellow

try {
    gcloud run deploy $SERVICE_NAME `
        --image $imageUrl `
        --platform managed `
        --region $REGION `
        --allow-unauthenticated `
        --port 8000 `
        --cpu 1 `
        --memory 2Gi `
        --min-instances 0 `
        --max-instances 10 `
        --set-env-vars "GEMINI_API_KEY=$GEMINI_API_KEY" `
        --timeout 900
        
    Write-Host "Deployment completed successfully" -ForegroundColor Green
    
    # Get the service URL
    $serviceUrl = gcloud run services describe $SERVICE_NAME --region=$REGION --format="value(status.url)"
    Write-Host "Service URL: $serviceUrl" -ForegroundColor Cyan
    
    # Test the health endpoint
    Write-Host "Testing health endpoint..." -ForegroundColor Yellow
    try {
        $healthResponse = Invoke-RestMethod -Uri "$serviceUrl/health/" -Method Get
        Write-Host "Health check passed: $($healthResponse.status)" -ForegroundColor Green
    } catch {
        Write-Host "Health check failed, but service might still be starting up" -ForegroundColor Yellow
    }
    
    Write-Host ""
    Write-Host "Deployment Summary:" -ForegroundColor Green
    Write-Host "   Service Name: $SERVICE_NAME"
    Write-Host "   URL: $serviceUrl"
    Write-Host "   Region: $REGION"
    Write-Host "   Image: $imageUrl"
    Write-Host ""
    Write-Host "Next steps:"
    Write-Host "   1. Update your React app's VITE_API_URL to: $serviceUrl"
    Write-Host "   2. Test the OCR endpoint: $serviceUrl/process-image/"
    Write-Host "   3. Test the enhancement endpoint: $serviceUrl/enhance-text/"
    
} catch {
    Write-Host "Failed to deploy to Cloud Run: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "Deployment completed successfully!" -ForegroundColor Green
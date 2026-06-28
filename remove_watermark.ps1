$ErrorActionPreference = "Stop"
Write-Host "Downloading FFmpeg..."
Invoke-WebRequest -Uri "https://github.com/BtbN/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip" -OutFile "ffmpeg.zip"

Write-Host "Extracting FFmpeg..."
Expand-Archive -Path "ffmpeg.zip" -DestinationPath "ffmpeg_extracted" -Force
$ffmpeg_exe = (Get-ChildItem -Path "ffmpeg_extracted" -Filter "ffmpeg.exe" -Recurse).FullName

Write-Host "Cropping the video to remove watermark..."
# Crop 10% off the bottom and right edges to remove the Gemini logo
& $ffmpeg_exe -y -i video.mp4 -vf "crop=in_w*0.9:in_h*0.9:0:0" -c:v libx264 -crf 23 -c:a copy video_cropped.mp4

if (Test-Path "video_cropped.mp4") {
    Write-Host "Replacing original video..."
    Move-Item -Path "video_cropped.mp4" -Destination "video.mp4" -Force
    Write-Host "Watermark removed successfully!"
} else {
    Write-Host "Failed to process the video."
}

Write-Host "Cleaning up..."
Remove-Item -Path "ffmpeg.zip" -Force
Remove-Item -Path "ffmpeg_extracted" -Recurse -Force

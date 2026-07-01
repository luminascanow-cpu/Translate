export interface TextOverlay {
  text: string;
  bbox: { x0: number, y0: number, x1: number, y1: number };
}

export const getProcessedImages = async (base64Str: string): Promise<{ocrImage: string, displayImage: string}> => {
  return new Promise((resolve) => {
    if (!base64Str) return resolve({ocrImage: "", displayImage: ""});
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_DIMENSION = 2048; // Maximize resolution for highest OCR accuracy
      let width = img.width;
      let height = img.height;
      
      if (width > height) {
        if (width > MAX_DIMENSION) {
          height *= MAX_DIMENSION / width;
          width = MAX_DIMENSION;
        }
      } else {
        if (height > MAX_DIMENSION) {
          width *= MAX_DIMENSION / height;
          height = MAX_DIMENSION;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        // Draw the image resized
        ctx.drawImage(img, 0, 0, width, height);
        // We use the same image for both display and OCR
        const processedDataUrl = canvas.toDataURL("image/jpeg", 0.95);
        
        resolve({ocrImage: processedDataUrl, displayImage: processedDataUrl});
      } else {
        resolve({ocrImage: base64Str, displayImage: base64Str});
      }
    };
    img.onerror = () => resolve({ocrImage: "", displayImage: ""});
    img.src = base64Str;
  });
};

export const compressImage = async (base64Str: string, overlays?: TextOverlay[], renderBlankCanvas: boolean = false): Promise<string> => {
  return new Promise((resolve) => {
    if (!base64Str) return resolve("");
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const MAX_WIDTH = 2048; 
      const MAX_HEIGHT = 2048;
      let width = img.width;
      let height = img.height;
      
      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }
      
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        // Always draw the original image so graphics/drawings are preserved
        ctx.drawImage(img, 0, 0, width, height);

        if (overlays && overlays.length > 0) {
          const scaleX = width / img.width;
          const scaleY = height / img.height;

          overlays.forEach(overlay => {
            const sx = overlay.bbox.x0 * scaleX;
            const sy = overlay.bbox.y0 * scaleY;
            const sWidth = (overlay.bbox.x1 - overlay.bbox.x0) * scaleX;
            const sHeight = (overlay.bbox.y1 - overlay.bbox.y0) * scaleY;

            const padding = 4;
            
            if (!renderBlankCanvas) {
              const sampleX = Math.max(0, sx - padding);
              const sampleY = Math.max(0, sy - padding);
              
              try {
                const pixelData = ctx.getImageData(sampleX, sampleY, 1, 1).data;
                const bgR = pixelData[0];
                const bgG = pixelData[1];
                const bgB = pixelData[2];
                
                ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`;
                // Oversize the rectangle to completely obscure the original text
                ctx.fillRect(sx - (padding*2), sy - (padding*2), sWidth + (padding * 4), sHeight + (padding * 4));
                ctx.fillStyle = "#8f3316";
              } catch (e) {
                ctx.fillStyle = "white";
                ctx.fillRect(sx - (padding*2), sy - (padding*2), sWidth + (padding * 4), sHeight + (padding * 4));
                ctx.fillStyle = "#8f3316";
              }
            } else {
              // Draw a solid white box over the original text to hide it cleanly
              ctx.fillStyle = "#ffffff";
              ctx.fillRect(sx - (padding*2), sy - (padding*2), sWidth + (padding * 4), sHeight + (padding * 4));
              ctx.fillStyle = "#000000"; // Black text on white box
            }

            // Binary Search for optimal font size to fit text perfectly inside the bounding box
            let minF = 8;
            let maxF = Math.min(100, sHeight);
            let optimalFontSize = minF;
            let finalLines = [overlay.text];
            
            while (minF <= maxF) {
              const testFontSize = Math.floor((minF + maxF) / 2);
              ctx.font = `${testFontSize}px sans-serif`;
              
              const words = overlay.text.split(' ');
              let currentLine = '';
              const tempLines = [];
              
              for (let i = 0; i < words.length; i++) {
                const testLine = currentLine + words[i] + ' ';
                const metrics = ctx.measureText(testLine);
                if (metrics.width > sWidth * 0.95 && i > 0) {
                  tempLines.push(currentLine.trim());
                  currentLine = words[i] + ' ';
                } else {
                  currentLine = testLine;
                }
              }
              tempLines.push(currentLine.trim());
              
              const totalHeight = tempLines.length * (testFontSize * 1.2);
              
              if (totalHeight > sHeight * 0.9) {
                maxF = testFontSize - 1; // Font is too big
              } else {
                optimalFontSize = testFontSize;
                finalLines = tempLines;
                minF = testFontSize + 1; // Try bigger font
              }
            }

            // Fallback if the box was too small even for size 8
            if (optimalFontSize < 8) {
              optimalFontSize = 8;
            }

            ctx.font = `${optimalFontSize}px sans-serif`;
            ctx.textAlign = finalLines.length > 1 ? "left" : "center";
            ctx.textBaseline = "top";
            
            const lineHeight = optimalFontSize * 1.2;
            const totalTextHeight = finalLines.length * lineHeight;
            
            // Vertically center the entire block of text within the bounding box
            let currentY = sy + (sHeight - totalTextHeight) / 2;

            finalLines.forEach(lineText => {
              const xPos = finalLines.length > 1 ? sx + (sWidth * 0.025) : sx + sWidth/2;
              ctx.fillText(lineText, xPos, currentY, sWidth * 0.95);
              currentY += lineHeight;
            });
          });
        }

        resolve(canvas.toDataURL("image/jpeg", 0.85));
      } else {
        resolve(base64Str);
      }
    };
    img.onerror = () => resolve("");
    img.src = base64Str;
  });
};

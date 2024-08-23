const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

export async function drawCustomGrid(inputPath, outputPath, cellSize = 10, boldLineInterval = 5) {
    // Load the image
    const image = await loadImage(inputPath);

    // Create a canvas with the same size as the image
    const canvas = createCanvas(image.width, image.height);
    const ctx = canvas.getContext('2d');

    // Draw the original image onto the canvas first
    ctx.drawImage(image, 0, 0, image.width, image.height);

    // Define the color for the bold grid lines
    const boldRed = 'rgba(255, 0, 0, 1)';    // Bold red for bolder lines

    // Start drawing bold lines after the first 5 lines
    const startBoldLinesAt = boldLineInterval * cellSize;

    // Draw vertical bold grid lines
    for (let x = 0; x <= image.width; x += cellSize * boldLineInterval) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, image.height);

        ctx.strokeStyle = boldRed;
        ctx.lineWidth = 2;

        ctx.stroke();

        // Add labels at the top, making them bigger and moving them slightly to the right
        if (x !== 0) {
            ctx.fillStyle = boldRed;
            ctx.font = '16px Arial'; // Larger font size
            ctx.fillText(`C${x / cellSize}`, x + 5, 20); // Adjusted label position for larger size
        }
    }

    // Draw horizontal bold grid lines
    for (let y = 0; y <= image.height; y += cellSize * boldLineInterval) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(image.width, y);

        ctx.strokeStyle = boldRed;
        ctx.lineWidth = 2;

        ctx.stroke();

        // Add labels on the left, making them bigger and slightly below the line
        if (y !== 0) {
            ctx.fillStyle = boldRed;
            ctx.font = '16px Arial'; // Larger font size
            ctx.fillText(`R${y / cellSize}`, 2, y + 20); // Adjusted label position for larger size
        }
    }

    // Save the image with the custom grid
    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync(outputPath, buffer);
    console.log(`Image with custom grid saved to ${outputPath}`);
}

// Get the canvas element
const canvas = document.getElementById('figure-canvas');

// Get the canvas context
const ctx = canvas.getContext('2d');

// Function to resize the canvas to match its displayed size
function resizeCanvasToDisplaySize(canvas) {
  // Lookup the size the browser is displaying the canvas in CSS pixels.
  const displayWidth  = canvas.clientWidth;
  const displayHeight = canvas.clientHeight;
 
  // Check if the canvas is not the same size.
  const needResize = canvas.width  !== displayWidth ||
                     canvas.height !== displayHeight;
 
  if (needResize) {
    // Make the canvas the same size
    canvas.width  = displayWidth;
    canvas.height = displayHeight;
  }
 
  return needResize;
}

// Call the resize function initially and whenever the window is resized
window.addEventListener('resize', () => {
  resizeCanvasToDisplaySize(canvas);
  // Call any drawing functions here if needed
});

// Call the resize function initially to set the canvas size correctly
resizeCanvasToDisplaySize(canvas);


// Enable anti-aliasing
ctx.imageSmoothingEnabled = true;

// Function to draw a circle inscribed with a square
export function dibujarCirculoCuadrado(lado1) {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Calculate the radius of the circle
    const radio = lado1 / Math.sqrt(2);

    // Draw circle
    ctx.beginPath();
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height / 2, radio, 0, 2 * Math.PI);
    ctx.stroke();

    // Draw square
    const x = (ctx.canvas.width - lado1) / 2;
    const y = (ctx.canvas.height - lado1) / 2;
    ctx.beginPath();
    ctx.rect(x, y, lado1, lado1);
    ctx.stroke();
}


export function dibujarRectanguloDiagonalesRombo(lado1, lado2, lado3) {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Sort the sides in ascending order
    const sides = [lado1, lado2, lado3].sort((a, b) => a - b);
    const [shortestSide, middleSide, longestSide] = sides;

    if (shortestSide === middleSide && longestSide !== shortestSide) {
        // Draw rectangle
        ctx.beginPath();
        ctx.rect(50, 50, longestSide, middleSide);
        ctx.stroke();

        // Calculate coordinates of rhombus vertices
        const x1 = 50;
        const x2 = x1 + longestSide / 2;
        const x3 = x1 + longestSide;
        const y1 = 50;
        const y2 = y1 + middleSide / 2;
        const y3 = y1 + middleSide;

        // Draw rhombus
        ctx.beginPath();
        ctx.moveTo(x2, y1);
        ctx.lineTo(x3, y2);
        ctx.lineTo(x2, y3);
        ctx.lineTo(x1, y2);
        ctx.closePath();
        ctx.stroke();

        // Draw diagonals of the rhombus
        ctx.beginPath();
        ctx.moveTo(x1, y2);
        ctx.lineTo(x3, y2);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x2, y1);
        ctx.lineTo(x2, y3);
        ctx.stroke();
    } else {
        alert('Longitudes de lados no válidas para rectángulo con rombo. Debe poner dos valores menores y luego uno mayor.');
    }
}

// Function to draw a scalene triangle with a line dividing it
export function dibujarTrianguloTrapezoideEscaleno(lado1, lado2, lado3) {
    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Calculate the coordinates of the triangle vertices
    const centerX = ctx.canvas.width / 2; // x-coordinate of the center of the canvas
    const centerY = ctx.canvas.height / 2; // y-coordinate of the center of the canvas

    // Calculate the height of the triangle
    const height = Math.sqrt(3) * lado1 / 2;

    // Coordinates of the vertices of the scalene triangle
    const x1 = centerX - lado1 / 2; // x-coordinate of the first vertex
    const y1 = centerY + height / 2; // y-coordinate of the first vertex
    const x2 = x1 + lado1; // x-coordinate of the second vertex
    const y2 = y1; // y-coordinate of the second vertex
    const x3 = centerX + (lado3 - lado2) / 2; // x-coordinate of the third vertex
    const y3 = centerY - height / 2; // y-coordinate of the third vertex

    // Draw the scalene triangle
    ctx.beginPath();
    ctx.moveTo(x1, y1); // Start from the first vertex
    ctx.lineTo(x2, y2); // Draw a line to the second vertex
    ctx.lineTo(x3, y3); // Draw a line to the third vertex
    ctx.closePath(); // Draw a line back to the first vertex to close the shape
    ctx.stroke(); // Outline the triangle

    // Calculate the position of the dividing line
    const lineY = centerY + height / 6; // Y-coordinate for the dividing line

    // Draw the dividing line
    ctx.beginPath();
    ctx.moveTo(centerX - lado1 / 2.8, lineY); // Start from the left side
    ctx.lineTo(centerX + lado1 / 3, lineY); // Draw a line to the right side
    ctx.stroke(); // Draw the line
}


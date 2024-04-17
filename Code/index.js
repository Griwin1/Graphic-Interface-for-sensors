const canvas = document.getElementById('sensor1');
const ctx = canvas.getContext('2d');

// Set canvas dimensions
canvas.width = 350;
canvas.height = 350;


// Draw the gray background arc
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radiusBlackV2 = 106; // По-голям радиус за сивата арка
ctx.beginPath();
ctx.arc(centerX, centerY, radiusBlackV2, 0, Math.PI * 2);
ctx.fillStyle = 'black'; // Сив цвят
ctx.fill();


// Draw the gray background arc
const radiusGray = 100; // По-голям радиус за сивата арка
ctx.beginPath();
ctx.arc(centerX, centerY, radiusGray, 0, Math.PI * 2);
ctx.fillStyle = 'gray'; // Сив цвят
ctx.fill();

// Draw the black background arc
const radiusBlack = 90; // По-малък радиус за черната арка
ctx.beginPath();
ctx.arc(centerX, centerY, radiusBlack, 0, Math.PI * 2);
ctx.fillStyle = 'black';
ctx.fill();

// Draw the large arc
const startAngle = Math.PI * 0.25 + Math.PI / 2; // Start angle (in radians) + 90 градуса
const endAngle = Math.PI * 1.75 + Math.PI / 2; // End angle (in radians) + 90 градуса
ctx.beginPath();
ctx.arc(centerX, centerY, radiusBlack, startAngle, endAngle);
ctx.strokeStyle = 'black';
ctx.lineWidth = 5;
ctx.stroke();

// Draw the big lines and add numbers
const numBigLines = 13;
const angleStep = (endAngle - startAngle) / (numBigLines - 1);
ctx.lineWidth = 3.3;
ctx.strokeStyle = 'white';
ctx.fillStyle = 'white'; // Цвят на числата
ctx.font = '15px Arial'; // Шрифт и размер на числата
for (let i = 0; i < numBigLines; i++) {
    const angle = startAngle + angleStep * i;
    const x1 = centerX + Math.cos(angle) * radiusBlack;
    const y1 = centerY + Math.sin(angle) * radiusBlack;
    const x2 = centerX + Math.cos(angle) * (radiusBlack - 20);
    const y2 = centerY + Math.sin(angle) * (radiusBlack - 20);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    
   
    // Добавяне на числата
    if (i % 2 == 0) {
        const psi = i * 5;
        const psiText = psi.toString(); 
        const textWidth = ctx.measureText(psiText).width; 
        const textX = centerX + Math.cos(angle) * (radiusBlack - 30) - textWidth / 2; 
        const textY = centerY + Math.sin(angle) * (radiusBlack - 30) + 5; // 6 за да центрираме числата вертикално
        ctx.fillText(psiText, textX, textY); 

        let boost = "BOOST";
        ctx.font = "14px Jersey 10";
        ctx.fillText(boost, 150, 240);
    }
}

const numSmallLines = 4;
ctx.strokeStyle = 'white';
for (let i = 0; i < numBigLines - 1; i++) {
    const startAngle = angleStep * i + Math.PI * 0.25 + Math.PI / 2;
    const endAngle = angleStep * (i + 1) + Math.PI * 0.25 + Math.PI / 2;
    const angleIncrement = (endAngle - startAngle) / (numSmallLines + 1);
    for (let j = 1; j <= numSmallLines; j++) {
        const angle = startAngle + angleIncrement * j;
        const x1 = centerX + Math.cos(angle) * radiusBlack;
        const y1 = centerY + Math.sin(angle) * radiusBlack;
        const x2 = centerX + Math.cos(angle) * (radiusBlack - 10); 
        const y2 = centerY + Math.sin(angle) * (radiusBlack - 10);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }
} 
ctx.beginPath();
ctx.arc(centerX, centerY, 30, 0, Math.PI * 2); // Радиусът на кръга е 6
ctx.fillStyle = '#36454F'; // Цвят на кръга
ctx.fill();
// Draw the pressure line
let pressure = -50; 
if (pressure < 0) {
    pressure = 0; // Set pressure to 0 if negative
}
const pressureAngle = startAngle + (endAngle - startAngle) * (pressure / 60);
const pressureX = centerX + Math.cos(pressureAngle) * 30;
const pressureY = centerY + Math.sin(pressureAngle) * 30;
ctx.beginPath();
ctx.moveTo(centerX, centerY);
ctx.lineTo(pressureX, pressureY);
ctx.strokeStyle = 'red'; // Change color if needed
ctx.lineWidth = 3; // Adjust line width if needed
ctx.stroke();

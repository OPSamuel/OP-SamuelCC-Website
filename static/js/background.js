const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();

const particles = [];
const particleCount = Math.floor(window.innerWidth * window.innerHeight / 8000);

const colors = [
    'rgba(0, 209, 178, 0.6)',  
    'rgba(0, 209, 178, 0.4)',  
    'rgba(100, 255, 218, 0.5)', 
    'rgba(0, 180, 150, 0.7)'   
];

function createParticles() {
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 2 + 1,
            speedX: Math.random() * 1 - 0.5,
            speedY: Math.random() * 1 - 0.5,
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    }
}
createParticles();

const mouse = {
    x: null,
    y: null,
    radius: 150
};

window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function() {
    resizeCanvas();
});

function drawParticles() {
    for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
        
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const distance = Math.sqrt(
                Math.pow(p.x - p2.x, 2) + 
                Math.pow(p.y - p2.y, 2)
            );
            
            
            if (distance < 120) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(0, 209, 178, ${1 - distance/120})`;
                ctx.lineWidth = 0.3;
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        }
        
        if (mouse.x !== null && mouse.y !== null) {
            const mouseDistance = Math.sqrt(
                Math.pow(p.x - mouse.x, 2) + 
                Math.pow(p.y - mouse.y, 2)
            );
            
            if (mouseDistance < mouse.radius) {
                
                const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
                const force = (mouse.radius - mouseDistance) / mouse.radius * 3;
                
                p.x += Math.cos(angle) * force;
                p.y += Math.sin(angle) * force;
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawParticles();
    requestAnimationFrame(animate);
}

animate();

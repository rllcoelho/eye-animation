document.addEventListener('DOMContentLoaded', () => {
    const eye = document.querySelector('.eye');
    const ball = document.querySelector('.ball');
    if (!eye || !ball) return;
    
    const ballRadius = ball.offsetWidth / 2;
    const eyeHalfSize = 40; // eye width / 2
    const innerLimit = eyeHalfSize - ballRadius; // 20
    
    window.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event;
        
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        
        const dx = clientX - eyeCenterX;
        const dy = clientY - eyeCenterY;
        
        const angle = -Math.PI / 4; // inverse of 45deg rotation
        const localX = dx * Math.cos(angle) - dy * Math.sin(angle);
        const localY = dx * Math.sin(angle) + dy * Math.cos(angle);
        
        // invert direction (ball moves opposite to mouse)
        let targetX = -localX;
        let targetY = -localY;
        
        // clamp to inner square (ball must stay within eye bounds)
        targetX = Math.max(-innerLimit, Math.min(innerLimit, targetX));
        targetY = Math.max(-innerLimit, Math.min(innerLimit, targetY));
        
        // check if point lies inside missing quarter circle (top‑left corner)
        const offsetX = targetX + eyeHalfSize; // distance from circle center (‑40,‑40) in local coords
        const offsetY = targetY + eyeHalfSize;
        const distanceToCorner = Math.sqrt(offsetX * offsetX + offsetY * offsetY);
        const quarterCircleRadius = 80; // eye radius
        
        if (distanceToCorner < quarterCircleRadius) {
            // push point outward along radial direction
            const scale = quarterCircleRadius / distanceToCorner;
            const pushedX = offsetX * scale;
            const pushedY = offsetY * scale;
            targetX = pushedX - eyeHalfSize;
            targetY = pushedY - eyeHalfSize;
            
            // re‑clamp to inner square (pushed point may exceed limits)
            targetX = Math.max(-innerLimit, Math.min(innerLimit, targetX));
            targetY = Math.max(-innerLimit, Math.min(innerLimit, targetY));
        }
        
        const ballLeft = eyeHalfSize + targetX - ballRadius;
        const ballTop = eyeHalfSize + targetY - ballRadius;
        
        ball.style.left = `${ballLeft}px`;
        ball.style.top = `${ballTop}px`;
    });
});
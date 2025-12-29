document.addEventListener('DOMContentLoaded', () => {
    const eye = document.querySelector('.eyeball');
    const pupil = document.querySelector('.pupil');
    if (!eye || !pupil) return;
    
    const pupilRadius = pupil.offsetWidth / 2;
    const eyeHalfSize = (eye.offsetWidth / 2) +3;
    const innerLimit = eyeHalfSize - pupilRadius; // 20
    
    window.addEventListener('mousemove', (event) => {
        const { clientX, clientY } = event;
        
        const eyeRect = eye.getBoundingClientRect();
        const eyeCenterX = eyeRect.left + eyeRect.width / 2;
        const eyeCenterY = eyeRect.top + eyeRect.height / 2;
        
        const dx = clientX - eyeCenterX;
        const dy = clientY - eyeCenterY;
        
        // invert direction (ball moves opposite to mouse)
        let targetX = -dx;
        let targetY = -dy;
        
        // clamp to inner square (ball must stay within eye bounds)
        targetX = Math.max(-innerLimit, Math.min(innerLimit, targetX));
        targetY = Math.max(-innerLimit, Math.min(innerLimit, targetY));
         
        const pupilLeft = eyeHalfSize + targetX - pupilRadius;
        const pupilTop = eyeHalfSize + targetY - pupilRadius;
        
        pupil.style.left = `${pupilLeft}px`;
        pupil.style.top = `${pupilTop}px`;
    });
});
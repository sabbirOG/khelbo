// Interactive divider dot: drag to left/right to change background
document.addEventListener('DOMContentLoaded', function () {
    const divider = document.querySelector('.glow-divider');
    const dot = document.querySelector('.divider-dot');
    let dragging = false;
    let startX = 0;
    let dotStartLeft = 0;
    const minLeft = 0;
    const maxLeft = () => divider.offsetWidth;
    let autoAnim = true;
    let autoDir = 1; // 1: right, -1: left
    let autoFrame = null;

    function setDotPosition(left, smooth = false) {
        const percent = (left / divider.offsetWidth) * 100;
        if (smooth) {
            dot.style.transition = 'left 0.7s cubic-bezier(.4,0,.2,1)';
        } else {
            dot.style.transition = 'none';
        }
        dot.style.left = `calc(${percent}% )`;
    }

    function setBackgroundByDot(left) {
        const percent = left / divider.offsetWidth;
        if (percent > 0.5) {
            document.body.classList.add('bg-right');
            document.body.classList.remove('bg-left');
        } else {
            document.body.classList.add('bg-left');
            document.body.classList.remove('bg-right');
        }
    }

    // Automatic animation
    function animateDot() {
        if (!autoAnim || dragging) return;
        const currentLeft = dot.offsetLeft;
        let nextLeft = currentLeft + autoDir * 2; // speed
        if (nextLeft >= maxLeft()) {
            nextLeft = maxLeft();
            autoDir = -1;
        } else if (nextLeft <= minLeft) {
            nextLeft = minLeft;
            autoDir = 1;
        }
        setDotPosition(nextLeft, false);
        setBackgroundByDot(nextLeft);
        autoFrame = requestAnimationFrame(animateDot);
    }

    // Mouse events
    dot.addEventListener('mousedown', function (e) {
        dragging = true;
        autoAnim = false;
        startX = e.clientX;
        dotStartLeft = dot.offsetLeft;
        dot.style.transition = 'none';
        document.body.style.userSelect = 'none';
        if (autoFrame) cancelAnimationFrame(autoFrame);
    });
    document.addEventListener('mousemove', function (e) {
        if (!dragging) return;
        const dx = e.clientX - startX;
        let newLeft = dotStartLeft + dx;
        newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft()));
        setDotPosition(newLeft);
        setBackgroundByDot(newLeft);
    });
    document.addEventListener('mouseup', function () {
        if (dragging) {
            dragging = false;
            // Snap to left or right smoothly
            const currentLeft = dot.offsetLeft;
            const snapLeft = currentLeft < divider.offsetWidth / 2 ? minLeft : maxLeft();
            setDotPosition(snapLeft, true);
            setBackgroundByDot(snapLeft);
            setTimeout(() => {
                dot.style.transition = 'left 0.18s';
                autoAnim = true;
                animateDot();
            }, 700);
            document.body.style.userSelect = '';
        }
    });

    // Touch support
    dot.addEventListener('touchstart', function (e) {
        dragging = true;
        autoAnim = false;
        startX = e.touches[0].clientX;
        dotStartLeft = dot.offsetLeft;
        dot.style.transition = 'none';
        document.body.style.userSelect = 'none';
        if (autoFrame) cancelAnimationFrame(autoFrame);
    });
    document.addEventListener('touchmove', function (e) {
        if (!dragging) return;
        const dx = e.touches[0].clientX - startX;
        let newLeft = dotStartLeft + dx;
        newLeft = Math.max(minLeft, Math.min(newLeft, maxLeft()));
        setDotPosition(newLeft);
        setBackgroundByDot(newLeft);
    });
    document.addEventListener('touchend', function () {
        if (dragging) {
            dragging = false;
            // Snap to left or right smoothly
            const currentLeft = dot.offsetLeft;
            const snapLeft = currentLeft < divider.offsetWidth / 2 ? minLeft : maxLeft();
            setDotPosition(snapLeft, true);
            setBackgroundByDot(snapLeft);
            setTimeout(() => {
                dot.style.transition = 'left 0.18s';
                autoAnim = true;
                animateDot();
            }, 700);
            document.body.style.userSelect = '';
        }
    });

    // Initialize dot in center, then start auto animation
    setDotPosition(divider.offsetWidth / 2, true);
    setBackgroundByDot(divider.offsetWidth / 2);
    setTimeout(() => {
        autoAnim = true;
        animateDot();
    }, 800);
});
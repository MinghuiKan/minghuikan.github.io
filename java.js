})();
document.querySelectorAll('.emotion-color').forEach(block => {
    block.addEventListener('click', () => {
        const emotionText = block.getAttribute('data-emotion');
        document.getElementById('emotion-display').textContent = `Emotion: ${emotionText}`;
    });
});

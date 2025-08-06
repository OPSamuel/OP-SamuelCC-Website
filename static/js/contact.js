function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {

        button.classList.add('copied');
        const originalIcon = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i>';
        
        setTimeout(() => {
            button.classList.remove('copied');
            button.innerHTML = originalIcon;
        }, 2000);
        
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = 'Copied to clipboard!';
        document.body.appendChild(notification);

        const rect = button.getBoundingClientRect();
        notification.style.top = `${rect.top - 40}px`;
        notification.style.left = `${rect.left - 10}px`;
        
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 1500);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
    });
}

function handleDiscordClick(event) {
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        event.preventDefault();
        navigator.clipboard.writeText("opsamuelcc");
        const tooltip = document.querySelector('.discord-link .tooltip');
        if (tooltip) {
            tooltip.textContent = 'Username copied!';
            setTimeout(() => {
                tooltip.textContent = 'Jump to my github profile!';
            }, 2000);
        }
    }
}
function handleGithubClick(event) {

    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
        event.preventDefault();

        navigator.clipboard.writeText("https://github.com/OPSamuel");
        
        let tooltip = event.currentTarget.querySelector('.tooltip');
        if (!tooltip) {
            tooltip = document.createElement('span');
            tooltip.className = 'tooltip';
            event.currentTarget.appendChild(tooltip);
        }
        tooltip.textContent = 'Profile link copied!';
        setTimeout(() => {
            tooltip.textContent = 'Visit my GitHub';
        }, 2000);
        
        setTimeout(() => {
            window.open("https://github.com/OPSamuel", '_blank');
        }, 100);
    }
}

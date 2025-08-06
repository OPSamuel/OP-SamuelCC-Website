document.addEventListener('DOMContentLoaded', function() {
    const githubStats = document.getElementById('github-stats');
    const topLangs = document.getElementById('top-langs');
    
    const cacheBuster = Date.now();
    
    const themeParams = "&title_color=00d1b2&text_color=e0e7ff&icon_color=00d1b2&bg_color=121a24&border_color=1e293b&hide_border=true";
    
    githubStats.src = `https://github-readme-stats.vercel.app/api?username=OPSamuel&show_icons=true${themeParams}&cache=${cacheBuster}`;
    topLangs.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=OPSamuel&layout=compact${themeParams}&cache=${cacheBuster}`;
    
    githubStats.onerror = function() {
        this.src = `https://github-readme-stats.vercel.app/api?username=OPSamuel&show_icons=true${themeParams}&cache=${Date.now()}`;
    };
    
    topLangs.onerror = function() {
        this.src = `https://github-readme-stats.vercel.app/api/top-langs/?username=OPSamuel&layout=compact${themeParams}&cache=${Date.now()}`;
    };
});

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const WEB_ROOT = '/home/samuelchance/Coding/Personal/Website';
const PORT = 8003;

const SERVER_VERSION = crypto.randomBytes(8).toString('hex');

const mimeTypes = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon',
    '.svg': 'image/svg+xml'
};

function getObfuscatedFilename(original) {
    const hash = crypto.createHash('sha256')
        .update(SERVER_VERSION)
        .update(original)
        .digest('hex')
        .substring(0, 12);
    return `${hash}${path.extname(original)}`;
}

function serve404(res) {
    res.writeHead(302, {
        'Location': 'https://opsamuelcc.com',
        'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
        'Pragma': 'no-cache',
        'Expires': '0'
    });
    res.end();
}

const server = http.createServer((req, res) => {
    const cleanUrl = req.url.split('?')[0].split('#')[0];
    
    if (cleanUrl === '/api/status') {
        const statusData = {
            success: true,
            status: 'online',
            timestamp: Date.now(),
            version: SERVER_VERSION,
            service: 'opsamuelcc.com',
            uptime: process.uptime(),
            lastDeploy: fs.statSync(path.join(WEB_ROOT, 'index.html')).mtime.toISOString()
        };

        res.writeHead(200, {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma': 'no-cache',
            'Expires': '0'
        });
        return res.end(JSON.stringify(statusData));
    }

    let filePath = cleanUrl === '/' ? 
        path.join(WEB_ROOT, 'index.html') : 
        path.join(WEB_ROOT, cleanUrl.replace(/\.\./g, ''));

    const resolutions = cleanUrl === '/' ? 
        [filePath] : 
        [
            filePath,                          
            `${filePath}.html`,               
            path.join(filePath, 'index.html')   
        ];

    let foundPath = null;
    for (const resolution of resolutions) {
        try {
            if (fs.existsSync(resolution) && fs.statSync(resolution).isFile()) {
                foundPath = resolution;
                break;
            }
        } catch (err) {
            continue;
        }
    }

    if (!foundPath) {
        return serve404(res);
    }

    fs.readFile(foundPath, (err, data) => {
        if (err) {
            return serve404(res);
        }

        const ext = path.extname(foundPath).toLowerCase();
        const obfuscatedName = getObfuscatedFilename(path.basename(foundPath));
        
        res.writeHead(200, {
            'Content-Type': mimeTypes[ext] || 'text/plain',
            'Content-Disposition': `inline; filename="${obfuscatedName}"`,
            'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
            'Pragma': 'no-cache',
            'Expires': '0',
            'ETag': `"${SERVER_VERSION}"`
        });

        if (ext === '.html') {
            let content = data.toString();
            content = content.replace(
                /(href|src)=["']([^"']*\.[a-z]{2,4})["']/gi,
                (match, attr, url) => {
                    const cleanUrl = url.split('?')[0].split('#')[0];
                    return `${attr}="${cleanUrl}?v=${SERVER_VERSION}"`;
                }
            );

            const scrollScript = `
                <script>
                    window.addEventListener('load', function() {
                        if (window.performance) {
                            const navEntries = performance.getEntriesByType('navigation');
                            if (navEntries.length > 0 && navEntries[0].type === 'reload') {
                                window.scrollTo(0, 0);
                            }
                        }
                    });
                </script>
            `;

            if (content.includes('</body>')) {
                content = content.replace('</body>', scrollScript + '</body>');
            } else {
                content += scrollScript;
            }

            res.end(content);
        } else {
            res.end(data);
        }
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Personal website running: https://opsamuelcc.com`);
});

const fs = require('fs');
const path = require('path');

const assetsPath = path.join(process.cwd(), 'assets');
console.log('CWD:', process.cwd());
console.log('Assets path:', assetsPath);

if (fs.existsSync(assetsPath)) {
    console.log('Assets folder exists');
    console.log('Contents:', fs.readdirSync(assetsPath, { recursive: true }));
} else {
    console.log('Assets folder does NOT exist');
}

const fs = require('fs');
const path = require('path');
const componentsDir = path.join(process.cwd(), 'src/components');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/(<input[^>]*className="[^"]*)text-sm/g, '$1text-base');
      content = content.replace(/(<textarea[^>]*className="[^"]*)text-sm/g, '$1text-base');
      fs.writeFileSync(fullPath, content);
    }
  }
}
replaceInDir(componentsDir);
console.log('Fixed inputs successfully!');

import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'src/components');

function replaceInDir(dir: string) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      content = content.replace(/px-6 md:px-12/g, 'px-4 md:px-8 lg:px-12');
      // Fix gap-16 to gap-8 lg:gap-16
      content = content.replace(/gap-16/g, 'gap-8 lg:gap-16');
      // Fix py-24 to py-16 lg:py-24
      content = content.replace(/py-24/g, 'py-16 lg:py-24');
      // Fix py-32 to py-20 lg:py-32
      content = content.replace(/py-32/g, 'py-20 lg:py-32');
      // Fix grid-cols-2 for products on small screens to grid-cols-1 sm:grid-cols-2
      content = content.replace(/grid-cols-2 md:grid-cols-4/g, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4');
      content = content.replace(/grid-cols-2 md:grid-cols-3 lg:grid-cols-3/g, 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3');
      fs.writeFileSync(fullPath, content);
    }
  }
}

replaceInDir(componentsDir);
console.log('Replaced successfully!');

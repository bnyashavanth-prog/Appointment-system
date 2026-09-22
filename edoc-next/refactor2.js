const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('./app');

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;

  content = content.replace(/border-gray-100/g, 'border-white/5');
  content = content.replace(/hover:bg-\[\#050505\]/g, 'hover:bg-white/10 transition-colors');
  content = content.replace(/hover:bg-red-50/g, 'hover:bg-red-500/10 transition-colors');
  content = content.replace(/bg-red-50/g, 'bg-red-500/10');
  content = content.replace(/border-red-200/g, 'border-red-500/20');
  content = content.replace(/text-red-600/g, 'text-red-400');
  content = content.replace(/text-red-800/g, 'text-red-300');
  content = content.replace(/rounded-3xl-sm/g, 'rounded-3xl');
  content = content.replace(/rounded-lg/g, 'rounded-2xl');
  content = content.replace(/rounded-md/g, 'rounded-xl');
  content = content.replace(/text-3xl font-bold mb-6/g, 'text-4xl font-extrabold text-white mb-8 tracking-tight');
  content = content.replace(/text-2xl font-bold mb-4/g, 'text-3xl font-extrabold text-white mb-6 tracking-tight');
  content = content.replace(/text-3xl font-bold mb-8/g, 'text-4xl font-extrabold text-white mb-10 tracking-tight');
  content = content.replace(/text-2xl font-bold mb-6/g, 'text-3xl font-extrabold text-white mb-8 tracking-tight');
  
  content = content.replace(/bg-\[\#050505\] border-b/g, 'bg-white/5 border-b'); // for theads

  if (original !== content) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});

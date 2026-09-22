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

  // 1. Ambient Background Blobs
  content = content.replace(/bg-white\/\s*\[0.02\]\s+rounded-full\s+blur-3xl\s+pointer-events-none/g, 'bg-white/[0.02] rounded-full blur-3xl pointer-events-none animate-blob');
  content = content.replace(/bg-white\/\[0\.02\] rounded-full blur-3xl pointer-events-none/g, 'bg-white/[0.02] rounded-full blur-3xl pointer-events-none animate-blob');

  // 2. Headings Animation
  content = content.replace(/<h1 className="([^"]*)"/g, (match, classes) => {
    if (!classes.includes('animate-fade-in-up')) {
      return `<h1 className="${classes} animate-fade-in-up"`;
    }
    return match;
  });

  // 3. Primary Buttons Motion
  content = content.replace(/bg-white hover:bg-zinc-200 text-black font-medium transition-all shadow-lg/g, 'bg-white hover:bg-zinc-200 text-black font-medium transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:scale-[0.97]');
  // And login/signup buttons
  content = content.replace(/hover:bg-zinc-200 transition-all duration-300 shadow-lg/g, 'hover:bg-zinc-200 transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:scale-[0.97]');
  
  // Secondary Buttons Motion
  content = content.replace(/bg-white\/10 hover:bg-white\/20 text-white border border-white\/20 transition-all/g, 'bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]');
  content = content.replace(/hover:bg-white\/20 transition-all duration-300/g, 'hover:bg-white/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]');

  // 4. Glass Cards / Dashboard Stats
  content = content.replace(/backdrop-blur-2xl bg-white\/\[0.06\] border border-white\/15 shadow-\[0_8px_32px_0_rgba\(0,0,0,0.8\)\] p-8 rounded-3xl transition-transform hover:-translate-y-1/g, 'backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.9)] animate-fade-in-up');
  
  // Generic Glass Cards
  content = content.replace(/backdrop-blur-2xl bg-white\/\[0.06\] border border-white\/15 shadow-\[0_8px_32px_0_rgba\(0,0,0,0.8\)\] rounded-3xl/g, 'backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl transition-all duration-300 ease-out animate-fade-in-up');
  
  // 5. Inputs / Forms
  content = content.replace(/bg-white\/5 border border-white\/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white\/30 focus:ring-1 focus:ring-white\/30 transition-all/g, 'bg-white/[0.04] border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-white/10 transition-all duration-300');

  // 6. Navigation Sidebar Links
  content = content.replace(/hover:bg-white\/10 transition-all/g, 'hover:bg-white/10 hover:translate-x-1 transition-all duration-300 ease-out');

  // 7. Table Rows
  content = content.replace(/hover:bg-white\/10 transition-colors/g, 'hover:bg-white/[0.04] transition-colors duration-200 ease-out');
  content = content.replace(/hover:bg-white\/5 transition-colors/g, 'hover:bg-white/[0.04] transition-colors duration-200 ease-out');
  
  // 8. Modals (Dialogs if any) - just ensuring opacity transition.
  // Actually, let's inject a wrapper delay for tables if we can, or just let them fade in via parent.

  if (original !== content) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});

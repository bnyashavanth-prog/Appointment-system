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

  // Tables & Cards
  content = content.replace(/bg-white(?!\/) p-6 rounded-lg shadow-sm border border-gray-200/g, 'backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-transform hover:-translate-y-1');
  content = content.replace(/bg-white(?!\/) p-6 rounded-lg/g, 'backdrop-blur-2xl bg-white/[0.06] border border-white/15 rounded-3xl p-6');
  content = content.replace(/bg-white(?!\/) rounded-lg shadow/g, 'backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl');
  content = content.replace(/bg-white(?!\/) rounded-lg shadow-md/g, 'backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl');
  
  // Backgrounds & Borders
  content = content.replace(/bg-gray-50/g, 'bg-[#050505]');
  content = content.replace(/bg-gray-100/g, 'bg-[#050505]');
  content = content.replace(/bg-white(?!\/)/g, 'bg-white/5');
  content = content.replace(/border-gray-200/g, 'border-white/10');
  content = content.replace(/divide-gray-200/g, 'divide-white/10');
  
  // Text Colors
  content = content.replace(/text-gray-900/g, 'text-white');
  content = content.replace(/text-gray-800/g, 'text-zinc-200');
  content = content.replace(/text-gray-700/g, 'text-zinc-300');
  content = content.replace(/text-gray-600/g, 'text-zinc-400');
  content = content.replace(/text-gray-500/g, 'text-zinc-400');
  content = content.replace(/text-blue-600/g, 'text-white');
  content = content.replace(/text-emerald-600/g, 'text-white');
  
  // Buttons (Primary)
  content = content.replace(/bg-blue-600 hover:bg-blue-700 text-white/g, 'bg-white hover:bg-zinc-200 text-black font-medium transition-all shadow-lg');
  content = content.replace(/bg-emerald-600 hover:bg-emerald-700 text-white/g, 'bg-white hover:bg-zinc-200 text-black font-medium transition-all shadow-lg');
  content = content.replace(/bg-red-500 hover:bg-red-600 text-white/g, 'bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all');
  
  // Table headers
  content = content.replace(/text-left text-xs font-medium text-zinc-400 uppercase tracking-wider/g, 'text-left text-xs font-medium text-zinc-400 uppercase tracking-wider');

  // Inputs
  content = content.replace(/border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500/g, 'bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all');
  content = content.replace(/border rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500/g, 'bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all');

  // Global specific fixes for layout elements
  content = content.replace(/bg-slate-800/g, 'backdrop-blur-2xl bg-white/[0.03] border-r border-white/10');
  content = content.replace(/border-slate-700/g, 'border-white/10');
  content = content.replace(/hover:bg-slate-700/g, 'hover:bg-white/10 text-zinc-300 hover:text-white transition-all');
  content = content.replace(/bg-blue-700/g, 'backdrop-blur-2xl bg-white/[0.03] border-r border-white/10');
  content = content.replace(/border-blue-600/g, 'border-white/10');
  content = content.replace(/hover:bg-blue-600/g, 'hover:bg-white/10 text-zinc-300 hover:text-white transition-all');
  content = content.replace(/bg-emerald-700/g, 'backdrop-blur-2xl bg-white/[0.03] border-r border-white/10');
  content = content.replace(/border-emerald-600/g, 'border-white/10');
  content = content.replace(/hover:bg-emerald-600/g, 'hover:bg-white/10 text-zinc-300 hover:text-white transition-all');

  if (original !== content) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated ' + file);
  }
});

// Publish only website files, never the project, tests, server or local work.
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const output=path.resolve(root,'dist');
if(output!==path.join(root,'dist')||!output.startsWith(root+path.sep))throw new Error('Invalid output directory');
fs.rmSync(output,{recursive:true,force:true});
fs.mkdirSync(output,{recursive:true});
const files=['index.html','styles.css','motion.css','photos.css','dark.css','menu-data.js','catalog-store.js','core.js','photo-data.js','payment-options.js','app.js','ui-bundle.js','ui-bundle.js.LEGAL.txt','photo-credits.html'];
for(const file of files)fs.copyFileSync(path.join(root,file),path.join(output,file));
for(const dir of ['assets','licenses'])fs.cpSync(path.join(root,dir),path.join(output,dir),{recursive:true});
fs.mkdirSync(path.join(output,'admin'),{recursive:true});
for(const file of ['index.html','admin.css','admin.js'])fs.copyFileSync(path.join(root,'admin',file),path.join(output,'admin',file));
console.log('Static website built in dist/');

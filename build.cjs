const path=require('node:path');
const esbuild=require(process.env.UI_NODE_MODULES?path.join(process.env.UI_NODE_MODULES,'esbuild'):'esbuild');
esbuild.buildSync({entryPoints:[path.join(__dirname,'src/ui.jsx')],bundle:true,minify:true,format:'iife',jsx:'automatic',target:['es2020'],outfile:path.join(__dirname,'ui-bundle.js'),define:{'process.env.NODE_ENV':'"production"'},legalComments:'linked',nodePaths:process.env.UI_NODE_MODULES?[process.env.UI_NODE_MODULES]:[]});

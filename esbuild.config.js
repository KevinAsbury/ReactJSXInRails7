#!/usr/local/bin/node
const path = require('path');
const rails = require('esbuild-rails');
const ImportGlobPlugin = require('esbuild-plugin-import-glob').default;

require('esbuild')
  .build({
    entryPoints: ['application.js'],
    bundle: true,
    sourcemap: true,
    watch: process.argv.includes('--watch'),
    outdir: path.join(process.cwd(), 'app/assets/builds'),
    absWorkingDir: path.join(process.cwd(), 'app/javascript'),
    loader: { '.js': 'jsx' },
    publicPath: 'assets',
    plugins: [rails(), ImportGlobPlugin()],
  })
  .catch(() => process.exit(1));

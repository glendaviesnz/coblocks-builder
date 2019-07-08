# CoBlocks Builder

A prototype custom build script for CoBlocks. Currently it:

* Clones the current master branch of CoBlocks
* Copies a custom blocks.js file to the source folder to only build selected blocks
* Runs CoBlocks standard grunt build job
* Removes src folder from coblocks/build/coblocks folder (it doesn't seem like the blocks src folder is used at all by the deployed plugin as everything is compiled down into the dist/ folder)

To use:
```shell
npm run build
```

After build has completed the `coblocks/build/colblocks` folder can be added to `wp-content/plugins` folder.

## Things to note

* You may need to install grunt globally for build script to run `npm install -g grunt`
* Will currently only work on OSX/Linux


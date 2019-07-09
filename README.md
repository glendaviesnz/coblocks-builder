# CoBlocks Builder

A prototype custom build script for CoBlocks. Currently it:

- Clones the release branch of CoBlocks that matches the version in ./package.json
- Copies a custom blocks.js file to the source folder to only build selected blocks
- Runs CoBlocks standard grunt build job
- Copies the CoBlocks build folder that is generated to ./build
- Removes any unused files and folders from the build folder

To use:

```shell
npm run build
```

After build has completed the `./build/coblocks` folder should be in state to be added to `wp-content/plugins` folder.

## Things to note

- You may need to install grunt globally for build script to run `npm install -g grunt`
- You currently need WP CLI in your path for the CoBlocks build to run

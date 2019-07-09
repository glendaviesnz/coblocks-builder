const version = require( './package.json' ).version;
const util = require( 'util' );
const exec = util.promisify( require( 'child_process' ).exec );
const rimraf = util.promisify( require( 'rimraf' ) );
const copyFile = util.promisify( require( 'fs' ).copyFile );
const unlink = util.promisify( require( 'fs' ).unlink );
const mv = util.promisify( require( 'mv' ) );

function removeDirectory( directory ) {
	console.log( `Removing directory  ${ directory }` );
	try {
		return rimraf( directory );
	} catch ( error ) {
		console.log( `There was an error removing ${ directory }: ${ error }` );
	}
}

function cloneRelease( version ) {
	console.log( `Cloning the CoBlocks branch for release ${ version }` );
	try {
		return exec( `git clone --branch ${ version } https://github.com/godaddy/coblocks.git` );
	} catch ( error ) {
		console.log( `There was an error cloning the CoBlocks repo: ${ error }` );
	}
}

function copy( source, destination ) {
	console.log( `Copying ${ source } to ${ destination }` );
	try {
		return copyFile( source, destination );
	} catch ( error ) {
		console.log( `There was an error copying ${ source } to ${ destination }` );
	}
}

function removeFile( file ) {
	console.log( `Removing ${ file }` );
	try {
		return unlink( file );
	} catch ( error ) {
		console.log( `There was an error removing ${ file }` );
	}
}

function moveDirectory( source, destination ) {
	console.log( `Moving ${ source } to ${ destination }` );
	try {
		return mv( source, destination, { mkdirp: true } );
	} catch ( error ) {
		console.log( `There was an error moving ${ source } to ${ destination }` );
	}
}

function runCoBlocksBuild() {
	console.log( 'Running CoBlocks build ...' );
	try {
		return exec( 'cd coblocks && npm install && grunt build', { maxBuffer: 1024 * 2000 } );
	} catch ( error ) {
		console.log( `There was an error running the CoBlocks build: ${ error }` );
	}
}

async function cleanBuild() {
	await removeDirectory( './build/coblocks/src' );
	await removeDirectory( './build/coblocks/includes/admin' );
	await removeFile( './build/coblocks/includes/class-coblocks-accordion-ie-support.php' );
	await removeFile( './build/coblocks/includes/class-coblocks-form.php' );
	await removeFile( './build/coblocks/includes/class-coblocks-google-map-block.php' );
}

async function build() {
	await removeDirectory( './coblocks' );
	await removeDirectory( './build' );
	await cloneRelease( version );
	await copy( './blocks.js', './coblocks/src/blocks.js' );
	await runCoBlocksBuild();
	await moveDirectory( './coblocks/build/coblocks', './build/coblocks' );
	await removeDirectory( './coblocks' );
	await cleanBuild();
}

build();

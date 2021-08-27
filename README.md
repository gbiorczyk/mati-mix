# What is Mati Mix?

Mati Mix provides a clean API for using Webpack. It is based on [Laravel Mix](https://github.com/JeffreyWay/laravel-mix). It adds many pre-defined options in the configuration and new possibilities.

Thanks to it, using Laravel Mix and Webpack becomes even easier :heart:

#### Contents:
 - [Installation](#installation)
 - [Usage](#usage)
 - [Demo](#demo)
 - [Config](#config)
 - [Available methods](#available-methods)
 - [Extra features](#extra-features)
 - [Built-In config](#built-in-config)
 - [Support](#support)

&nbsp;

# Installation

Run command in console:

	npm install --save-dev mati-mix

[▲ Contents](#contents)

&nbsp;

# Usage

Create `webpack.mix.js` file in the directory of your project:

	/**
	 * @see https://github.com/gbiorczyk/mati-mix/
	 */
	const mix = require( 'mati-mix' );
    ...

Add to your `package.json` file scripts list *(you can use default list generated by Laravel installation)*:

	"scripts": {
		"dev": "mix",
		"watch": "mix watch",
		"prod": "mix --production"
	},

And [browserslist](https://github.com/browserslist/browserslist):

	"browserslist": [
		"chrome 80",
		"firefox 72",
		"safari 13",
		"edge 80",
		"ie 11"
	],

Of course, give your list of browsers.

[▲ Contents](#contents)

&nbsp;

# Demo

A demo with an example of use can be found [here](https://github.com/gbiorczyk/mati-mix/tree/master/example/). Take advantage and make your work easier :trophy:

[▲ Contents](#contents)

&nbsp;

# Config

By default, Media Queries in CSS are sorted by the desktop first approach. If you prefer mobile first then add:

	mix.sassMobileFirst();

Would you like to use Browsersync? Use the following function by specifying your proxy and a list of files to be refreshed live:

	mix.browserSync(
		'example.test',
		[
			'./public/**/*.css',
		]
	);

To use aliases in JS, you must define them in the configuration:

	mix.aliases( {
		'class': __dirname + '/_dev/js/classes',
	} );

By default versioning is turned off. If you want to enable them, enter the code:

	mix.version();

That's all! The rest of the configuration is handled by Mati Mix :heart_eyes:

[▲ Contents](#contents)

&nbsp;

# Available methods

By using the package you have access to the following functions of Laravel Mix:

| Function                       | Information                                                           |
|--------------------------------|-----------------------------------------------------------------------|
| `mix.sass( src, output );`     | [Docs](https://laravel.com/docs/6.x/mix#sass)                         |
| `mix.js( src, output );`       | [Docs](https://laravel.com/docs/6.x/mix#working-with-scripts)         |
| `mix.scripts( src, output );`  | [Docs](https://laravel.com/docs/6.x/mix#vanilla-js)                   |
| `mix.webpackConfig( config );` | [Docs](https://laravel.com/docs/6.x/mix#custom-webpack-configuration) |

As `src` parameter we give the path to the file or an array with paths *(it works only for methods where you can specify array of paths)*. It's the same as in Laravel Mix, but here **you can use globally file loading**, for example:

	mix.js(
		[
			'_dev/js/polyfills/**/*.js',
			'_dev/js/Core.js',
		],
		'public/build/js/scripts.js'
	);

If you would like to use Laravel Mix directly, nothing prevents me from doing so. You have a global handler available all the time, which stores Laravel Mix instance:

	mix.mix

[▲ Contents](#contents)

&nbsp;

# Extra features

#### • Globally SASS loader

In your SASS file you can load files globally. To do it instead of the standard notation:

	@import 'sections/example1';
	@import 'sections/example2';
	@import 'sections/example2';
	// ...

you can load files from the entire directory dynamically:

	@import 'sections/*';
	// or
	@import 'sections/**/*';

[▲ Contents](#contents)

&nbsp;

# Built-In config

When using Laravel Mix, you must add at least a few lines of configuration.

&nbsp;

> :warning: **Do not enter below codes** in your configuration *(they are included automatically)*.

&nbsp;

Here's what Mati Mix will do for you:

#### • Disabling notification

	.disableNotifications();

#### • Setting default output path

	.setPublicPath( '/' );

#### • Generating Source Maps *(inline mode)* only in development environment

	if ( this.mix.inProduction() ) {
		.webpackConfig( {
			devtool: 'inline-source-map',
		} );
	}

#### • Disabling generation of Manifest files *(if versioning is disabled)*

	Mix.manifest.refresh = () => { void 0; };

#### • Easily adding aliases in JS

	.webpackConfig( {
		resolve: {
			extensions: [ '.js', '.vue', '.json' ],
			alias: ${list],
		},
	} );

#### • Running Browsersync

	.browserSync( {
		port: 3000,
		proxy,
		open: false,
		files,
	} );

#### • Babel configuration based on [browserslist](https://github.com/browserslist/browserslist) from package.json

	.babelConfig( {
		'presets': [
			[
				'@babel/preset-env',
				{
					targets: JSON.parse( require( 'fs' ).readFileSync( './package.json' ) ).browserslist
				},
			]
		]
	} );

#### • Removing `console.*` from JS files *(in production environment)*

	.options( {
		terser: {
			terserOptions: {
				compress: { drop_console: true },
			},
		},
	} );

#### • Ability to import SCSS files globally

	.webpackConfig( {
		module: {
			rules: [
				{
					test: /\.scss$/,
					loader: 'import-glob-loader',
				},
			],
		},
	} );

How to use in SASS?

	@import 'settings/*';
	@import 'tools/*';
	@import 'generic/*';
	@import 'ui/*';
	@import 'layout/*';
	@import 'components/*';
	@import 'sections/*';

#### • Launching Autoprefixer and combine Media Queries in CSS

	.options( {
		postCss: [
			require( 'autoprefixer' )( { cascade: false } ),
			require( 'css-mqpacker' )( {
				sort: isDesktopFirst ? mqSort.desktopFirst : mqSort,
			} ),
		],
	} );

#### • Turning off URL processing in CSS

	.options( {
		processCssUrls: false,
	} );

See how many lines of the configuration code you save. You do not have to enter them manually because they are added automatically.

[▲ Contents](#contents)

&nbsp;

# Support

Do you have any problem or idea for the development of Mati Mix? Let us know about it and create a [new issue](https://github.com/gbiorczyk/mati-mix/issues).

Thank you very much for this :heart: Thanks also to Jeffrey for [Laravel Mix](https://github.com/JeffreyWay/laravel-mix/).

[▲ Contents](#contents)

&nbsp;

> © 2021 by [Mateusz Gbiorczyk](https://gbiorczyk.pl/). The MIT License.

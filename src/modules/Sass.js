const path   = require('path');
const mqSort = require('sort-css-media-queries');

module.exports = class Sass
{
  constructor(mix)
  {
    this.mix = mix;
  }

  setGlobLoader()
  {
    this.mix.webpackConfig({
      module: {
        rules: [
          {
            test: /\.scss$/,
            loader: 'import-glob-loader',
          },
        ],
      },
    });
  }

  setPostCss(isDesktopFirst)
  {
    this.mix.options({
      postCss: [
        require('autoprefixer')({ cascade: false }),
        require('css-mqpacker')({
          sort: isDesktopFirst ? mqSort.desktopFirst : mqSort,
        }),
      ],
    });
  }

  setProcessUrls()
  {
    this.mix.options({
      processCssUrls: false,
    });
  }

  setWatcher(source)
  {
    if ((process.argv.indexOf('--watch') === -1) || !source || !fs.existsSync(source)) return;

    /* ---
      Call sass() re-compile after adding new scss file
    --- */

    let isWatchDisabled = false;
    fs.watch(path.dirname(source), () => {
      if (isWatchDisabled) return;
      isWatchDisabled = true;
      fs.writeFile(source, fs.readFileSync(source), () => {
        setTimeout(() => { isWatchDisabled = false; }, 0);
      });
    });
  }
};

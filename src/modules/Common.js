module.exports = class Common
{
  constructor(mix)
  {
    this.mix = mix;
  }

  setNotifications()
  {
    this.mix.disableNotifications();
  }

  setPublicPath()
  {
    this.mix.setPublicPath('/');
  }

  setSourceMap()
  {
    this.mix.webpackConfig({
      devtool: !this.mix.inProduction() ? 'inline-source-map' : '',
    });
  }

  setVersion(isActive)
  {
    if (isActive) {
      Mix.manifest.refresh = this.oldVersionRefresh;
      this.mix.version();
    } else {
      this.oldVersionRefresh = Mix.manifest.refresh;
      Mix.manifest.refresh = () => { void 0; };
    }
  }

  setAliases(list)
  {
    if (!list) return;

    this.mix.webpackConfig({
      resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: list,
      },
    });
  }

  setBrowserSync(proxy, files)
  {
    if (!proxy) return;

    this.mix.browserSync({
      port: 3000,
      proxy,
      open: false,
      files,
    });
  }
};

const Common = require('./modules/Common');
const Js     = require('./modules/Js');
const Sass   = require('./modules/Sass');

global.fs  = require('fs');
const glob = require('glob');

class Config
{
  constructor()
  {
    this.mix = require('laravel-mix');

    this.initMethods();
    this.loadModules();
  }

  /* ---
    Init methods
  --- */

  initMethods()
  {
    const list = ['less', 'sass', 'stylus', 'js', 'scripts'];
    list.forEach((method) => {
      this[method] = (src, output, options) => {
        if (method === 'sass') this.modules.sass.setWatcher(src);
        return this.mix[method](this.parseSource(src), output, options);
      };
    });
  }

  parseSource(sources)
  {
    if (!Array.isArray(sources)) return sources;
    let list = [];

    const { length } = sources;
    for (let i = 0; i < length; i++) {
      if (sources[i].indexOf('*') === -1) continue;
      const files = glob.sync(sources[i]);
      if (!files.length) continue;
      sources[i] = files;
    }

    for (let i = 0; i < length; i++) {
      if (!Array.isArray(sources[i])) list.push(sources[i]);
      else list = list.concat(sources[i]);
    }

    return list;
  }

  /* ---
    Load modules
  --- */

  loadModules()
  {
    this.modules = {
      common: this.loadCommon(),
      js: this.loadJs(),
      sass: this.loadSass(),
    };
  }

  loadCommon()
  {
    const api = new Common(this.mix);
    api.setNotifications();
    api.setPublicPath();
    api.setSourceMap();
    api.setVersion(false);
    return api;
  }

  loadJs()
  {
    const api = new Js(this.mix);
    api.setBabel();
    api.setMinify();
    return api;
  }

  loadSass()
  {
    const api = new Sass(this.mix);
    api.setGlobLoader();
    api.setPostCss(true);
    api.setProcessUrls();
    return api;
  }

  /* ---
    Public methods
  --- */

  sassMobileFirst()
  {
    this.modules.sass.setPostCss(false);
    return this;
  }

  aliases(list)
  {
    this.modules.common.setAliases(list);
    return this;
  }

  browserSync(proxy, files)
  {
    this.modules.common.setBrowserSync(proxy, files);
    return this;
  }

  version()
  {
    this.modules.common.setVersion(true);
    return this;
  }
}

module.exports = new Config();

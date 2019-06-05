module.exports = class Js
{
  constructor(mix)
  {
    this.mix = mix;
  }

  setBabel()
  {
    this.mix.babelConfig({
      'presets': [
        [
          '@babel/preset-env',
          {
            targets: JSON.parse(fs.readFileSync('./package.json')).browserslist,
          },
        ],
      ],
    });
  }

  setMinify()
  {
    this.mix.options({
      terser: {
        terserOptions: {
          compress: { drop_console: true },
        },
      },
    });
  }
};

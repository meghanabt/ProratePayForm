// webpack.config.js
module.exports = {
    module: {
      rules: [
        {
          test: /.(css|scss|sass)$/,
          use: [
            'style-loader',
            'css-loader',
            'postcss-loader',
          ],
        },
      ],
    },
    plugins: [
      require('tailwindcss'),
      require('autoprefixer'),
    ],
  };
  
const webpack = require('webpack')
const withCSS = require('@zeit/next-css')
const withMDX = require('@zeit/next-mdx')

const config = {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[name]-[local]",
  },
  pageExtensions: ['js', 'jsx', 'mdx'],
  webpack: config => {
    config.resolve.extensions.push('.mdx')
    config.resolve.alias = {
      "@styleguide": "./apparatus",
      '@components': './components',
      '@components/container': './components/container/index.js',
      '@components/display': './components/display/index.js',
      '@lib': './lib',
      '@page': './pages/index.js',
      '@static': './static'
    }
    config.plugins.push(
      new webpack.ContextReplacementPlugin(
        /highlight\.js\/lib\/languages$/,
        new RegExp(`^./(javascript|jsx|html)$`)
      )
    )
    return config
  }
}

module.exports =
  withMDX({ })(
    withCSS(config)
  )



module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules:  false
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-transform-runtime",
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true
      }
    ],
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-modules-commonjs"
  ]
};

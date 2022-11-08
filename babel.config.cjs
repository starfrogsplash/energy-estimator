module.exports = {
   presets: [
      '@babel/preset-typescript',
      ['@babel/preset-env', {
         targets: { node: "current" }
      }],
      '@babel/preset-flow',
    
   ],
   plugins: [["@babel/plugin-transform-modules-commonjs"], ["@babel/plugin-proposal-decorators", { "legacy": true }], ["@babel/plugin-proposal-class-properties"]]
}
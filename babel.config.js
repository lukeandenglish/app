/** @type {import('@babel/core').TransformOptions['plugins']} */
const plugins = [
  'macros',
  [
    'module-resolver',
    {
      root: ['.'],
      extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
      alias: {
        '@tests': ['./tests/*'],
        '@components/*': ['./src/components/*'],
        '@hooks/*': ['./src/hooks/*'],
        '@config/*': ['./src/config/*'],
        '@helper/*': ['./src/helper/*'],
        '@assets/*': ['./src/assets/*'],
        '@api/*': ['./src/api/*'],
        '@screen/*': ['./src/screen/*'],
        '@styleApp/*': ['./src/styleApp/*'],
        '@colors': ['./src/styleApp/colors/index.ts'],
        '@redux/*': ['./src/redux/*'],
        '@locale/*': ['./src/locale/*'],
      },
    },
  ],
  /** react-native-reanimated web support @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#web */
  '@babel/plugin-proposal-export-namespace-from',
  /** NOTE: This must be last in the plugins @see https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/installation/#babel-plugin */
  'react-native-reanimated/plugin',
];

/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: ['babel-preset-expo'],
  env: {
    production: {},
  },
  plugins,
};

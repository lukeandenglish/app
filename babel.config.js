module.exports = api => {
  api.cache(true);
  return {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
      '@babel/preset-react',
      'module:metro-react-native-babel-preset',
    ],
    plugins: [
      'macros',
      [
        'module-resolver',
        {
          root: ['./'],
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
      'react-native-reanimated/plugin',
    ],
  };
};

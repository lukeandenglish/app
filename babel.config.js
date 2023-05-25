module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
      '@babel/preset-react',
      'module:metro-react-native-babel-preset',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            '@tests': ['./tests/*'],
            '@components/*': ['./src/components/*'],
            '@hooks/*': ['./src/hooks/*'],
            '@colors': ['./src/styleApp/colors/index.ts'],
            '@config/*': ['./src/config/*'],
            '@helper/*': ['./src/helper/*'],
            '@assets/*': ['./src/assets/*'],
            '@api/*': ['./src/api/*'],
            '@screen/*': ['./src/screen/*'],
            '@styleApp/*': ['./src/styleApp/*'],
            '@redux/*': ['./src/redux/*'],
            '@locale/*': ['./src/locale/*'],
          },
        },
      ],
      'macros',
      'react-native-reanimated/plugin',
    ],
  };
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // expo-router को लागि
      require.resolve("expo-router/babel"),
      // module resolver plugin
      [
        "module-resolver",
        {
          root: ["./"],
          alias: {
            "@": "./src",   // optional shortcut imports
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};

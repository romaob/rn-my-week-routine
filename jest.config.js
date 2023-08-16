module.exports = {
  preset: 'react-native',
  setupFiles: ['./jest.setup.js'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['node_modules/?!(react-icons)'],
};

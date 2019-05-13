module.exports = {
  verbose: true,
  transformIgnorePatterns: ['node_modules'],
  moduleDirectories: ['src', 'node_modules'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^.+(\\.module){0,1}\\.styl': '<rootDir>/scripts/styleMock.js',
    '\\.svg': '<rootDir>/scripts/svgMock.js',
  },
  testPathIgnorePatterns: ['/node_modules/', '/src/'],
};

module.exports = {
  verbose: true,
  setupFiles: ['<rootDir>/scripts/jest.setup.js'],
  transformIgnorePatterns: [
    // 'node_modules',
    '/node_modules/(?!(@expandorg)/).*/',
  ],
  moduleDirectories: ['src', 'node_modules'],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '\\.js$': 'babel-jest',
  },
  moduleNameMapper: {
    '^.+(\\.module){0,1}\\.styl': '<rootDir>/scripts/styleMock.js',
    '\\.svg': '<rootDir>/scripts/svgMock.js',
  },
  testPathIgnorePatterns: ['/node_modules/', 'tests/e2e/'],
};

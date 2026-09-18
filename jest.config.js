/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.test\\.ts$',
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: '<rootDir>/../tsconfig.json',
      isolatedModules: false,
    }],
  },
  collectCoverageFrom: [
    '**/*.(t|j)s',
    '!**/*.test.ts',
    '!**/migrations/**',
    '!**/index.ts',
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/../jest.setup.ts'],
};

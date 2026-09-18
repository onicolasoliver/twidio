/** @type {import('jest').Config} */
module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\.integration\\.test\\.ts$',
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: '<rootDir>/../tsconfig.json',
      isolatedModules: false,
    }],
  },
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/../jest.setup.ts'],
};

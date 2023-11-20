require('dotenv').config();

module.exports = {
  collectCoverageFrom: ['**/*.ts'],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/configs',
    '<rootDir>/src/index.ts',
    '<rootDir>/modules.d.ts',
    '<rootDir>/lib',
  ],
  moduleFileExtensions: ['js', 'json', 'ts'],
  moduleNameMapper: {
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@configs/(.*)$': '<rootDir>/src/configs/$1',
    '^@error/(.*)$': '<rootDir>/src/error/$1',
    '^@services/(.*)$': '<rootDir>/src/services/$1',
    '^@utils/(.*)$': '<rootDir>/utils/$1',
  },
  rootDir: '.',
  setupFilesAfterEnv: ['./test.setup.ts'],
  testEnvironment: 'node',
  testRegex: '.*\\.spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    setupFiles: ['dotenv/config'],
    testPathIgnorePatterns: ['./tests/helpers/'],
    coveragePathIgnorePatterns: ['./tests/helpers/'],
    modulePathIgnorePatterns: ['./tests/helpers/']
};
  
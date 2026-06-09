export default {
  transform: {}, // Disable transformations if you want to run native ESM
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/tests/setup-jest.js'],
};

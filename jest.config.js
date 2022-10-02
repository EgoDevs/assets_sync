module.exports = {
  testMatch: [
    '<rootDir>/tests/**/*.test.{ts,tsx,js,jsx}',
    '<rootDir>/post_install/*.test.{ts,tsx,js,jsx}',
    '<rootDir>/scripts/*.test.{ts,tsx,js,jsx}',
  ],
  collectCoverage: false,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      '@swc/jest',
      {
        sourceMaps: true,
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: false,
          },
        },
      },
    ],
  },
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testEnvironment: 'node',
  testTimeout: 600000,
};

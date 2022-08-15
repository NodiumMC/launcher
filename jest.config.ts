export default {
  preset: 'ts-jest',
  transform: {
    '^.+\\.{ts,tsx}?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleDirectories: ['node_modules', 'src'],
}

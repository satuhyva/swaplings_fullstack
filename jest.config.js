
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

// "Regular" tests are *.test.js, whereas Cypress tests are all *.spec.js !!!
const customJestConfig = {
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
  testRegex: "(/__tests__/.*|(\\.|/)(test))\\.jsx?$",
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.ts"
  ],
  modulePathIgnorePatterns: ["<rootDir>/server/"]
}

module.exports = createJestConfig(customJestConfig)
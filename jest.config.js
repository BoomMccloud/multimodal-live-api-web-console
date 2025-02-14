module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.scss$': 'jest-transform-stub',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    'vega-embed': '<rootDir>/src/__mocks__/vega-embed.ts',
  },
  testEnvironment: 'jest-environment-node',
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTests.ts',
    '<rootDir>/src/test-setup.ts'
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!react-syntax-highlighter|vega-lite|vega-embed|vega).+\\.js$'
  ],
  globals: {
    'ts-jest': {
      isolatedModules: true
    }
  }
}; 
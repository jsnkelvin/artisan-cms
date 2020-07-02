// const esModules = ['@ionic'].join('|');
module.exports = {
  globals: {
    'ts-jest': {
      babelConfig: {
        presets: [['@babel/preset-env', { targets: { node: true }, modules: 'commonjs' }]],
        plugins: ['@babel/plugin-syntax-dynamic-import'],
      },
    },
  },
  preset: 'jest-preset-angular',
  roots: ['src'],
  setupFilesAfterEnv: ['./src/setup-jest.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!@ngrx|angular2-ui-switch|ng-dynamic)',
    // `<rootDir>/node_modules/(?!${esModules})`
  ],
  testPathIgnorePatterns: ['/node_modules/', '/src/environments/'],
  moduleDirectories: ['.', 'src', 'src/util', 'node_modules'],
  moduleNameMapper: {
    '@shared/(.*)': 'src/app/shared/$1',
    '@interceptors/(.*)': 'src/app/shared/interceptors/$1',
    '@guards/(.*)': 'src/app/shared/guards/$1',
    '@common/(.*)': 'src/app/shared/common/$1',
    '@pipes/(.*)': 'src/app/shared/pipes/$1',
    '@env/(.*)': 'src/environments/$1',
  },
};

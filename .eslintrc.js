module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended',
  ],
  plugins: [
    'only-warn'
  ],
  rules: {
    indent: ['warn', 2],
    'max-classes-per-file': 'off',
    'linebreak-style': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'spaced-comment': 'off',
    'comma-dangle': ['warn', {
      arrays: 'only-multiline',
      objects: 'only-multiline',
      imports: 'only-multiline',
      exports: 'only-multiline',
      functions: 'only-multiline',
    }],
    semi: ['warn', 'always'],
    'space-before-function-paren': ['warn', 'never'],
  },
};

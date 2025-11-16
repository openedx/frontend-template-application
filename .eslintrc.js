// eslint-disable-next-line import/no-extraneous-dependencies
const { createConfig } = require('@openedx/frontend-build');

module.exports = createConfig(
  'eslint',
  {
    rules: {
      'jsx-a11y/label-has-associated-control': [2, {
        controlComponents: ['Input'],
      }],
      'template-curly-spacing': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-restricted-exports': 'off',
      // There is no reason to disallow this syntax anymore; we don't use regenerator-runtime in new browsers
      'no-restricted-syntax': 'off',
    },
  },
);

import react from '@woohm402/eslint-config-react';

export default [
  {
    ignores: ['.yarn', '*.js', 'dist/**'],
  },
  ...react({
    tsconfigRootDir: import.meta.dirname,
  }),
];

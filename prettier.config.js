/* eslint-disable import/no-anonymous-default-export */
// prettier.config.js
module.export = {
  bracketSpacing: true,
  semi: true,
  trailingComma: "all",
  printWidth: 80,
  tabWidth: 2,
  /* eslint-disable */
  plugins: [() => import('prettier-plugin-tailwindcss')],
};

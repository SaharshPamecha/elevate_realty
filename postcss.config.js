// Configuration for PostCSS processing
import postcssImport from 'postcss-import';
import postcssNested from 'postcss-nested';
import tailwindcssNesting from 'tailwindcss/nesting';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes';
import postcssPresetEnv from 'postcss-preset-env';

const config = {
  plugins: [
    postcssImport(),
    tailwindcssNesting(postcssNested),
    tailwindcss(),
    autoprefixer(),
    postcssFlexbugsFixes(),
    postcssPresetEnv({
      autoprefixer: {
        flexbox: 'no-2009'
      },
      stage: 3,
      features: {
        'custom-properties': false,
        'nesting-rules': true
      }
    })
  ]
};

export default config;

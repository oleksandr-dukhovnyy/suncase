const postcss = require('postcss');
const postcssCombineMediaQuery = require('postcss-combine-media-query');
const fs = require('fs');

module.exports = function (base, pathToDist = '/dist/') {
  return {
    name: 'combine-media-queries',
    enforce: 'post',
    transformIndexHtml(html) {
      const processCss = async (css) => {
        const result = await postcss([postcssCombineMediaQuery()]).process(
          css,
          { from: undefined }
        );
        return result.css;
      };

      const transformedHtml = html.replace(
        /<link rel="stylesheet" href="(.+\.css)">/g,
        async (_, path) => {
          const pathToCss = path.replace(base, pathToDist);
          console.log({ pathToCss });

          const cssResponse = await fs.readFile(pathToCss);
          const css = await cssResponse.text();
          const transformedCss = await processCss(css);
          return `<style>${transformedCss}</style>`;
        }
      );

      return transformedHtml;
      // return html;
    },
  };
};

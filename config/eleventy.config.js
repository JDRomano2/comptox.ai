const CleanCSS = require("clean-css");
const fs = require("fs");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("cssmin", function(code) {
    return new CleanCSS({})
  })

  // Make 404 page work with `eleventy --serve`
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function(err, bs) {
        const content_404 = fs.readFileSync('www/404.html');

        bs.addMiddleware("*", (req, res) => {
          // Provide the 404 content without redirect
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  eleventyConfig.addPassthroughCopy('src/assets')
  eleventyConfig.addPassthroughCopy('src/_includes/assets/img')

  return {
    templateFormats: ["html", "njk", "md", "js", "png", "jpg"],
    dir: {
      input: 'src',
      includes: '_includes',
      data: '_data',
      output: 'www',
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",
    passthroughFileCopy: true
  };
};

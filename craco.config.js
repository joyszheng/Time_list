const path = require('path')
const resolve = pathname => path.resolve(__dirname, pathname)

module.exports = {
  webpack:{
    alias:{
      "@": resolve("src"),
      "components": resolve("src/components"),
      "assets": resolve("src/assets"),
      "pages": resolve("src/pages"),
      "api": resolve("src/api"),
      "Yeecharts": resolve("src/components/Echarts")
    }
  }
}

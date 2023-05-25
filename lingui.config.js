module.exports = {
    locales: ["en", "cs", "fr"],
    catalogs: [{
       path: "src/locale/{locale}/messages",
       include: ["src"]
    }],
    format: "po"
 }
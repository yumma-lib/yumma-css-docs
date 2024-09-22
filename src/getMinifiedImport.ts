export function getMinifiedImport(
  path = "/node_modules/yummacss/dist/yumma.min.css"
) {
  return `
/* Minified Version */
@import "${path}";`;
}

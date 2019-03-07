/**
 * Functor: No jargão da programação funcional um Functor é simplesmente algo mapeável, ou seja,
 * que suporta a operação map.
 *
 * só adicionada no prototype se não existir
 * Reduz um array multi-dimensional para apenas uma dimensão.
 */
if (!Array.prototype.$flatMap) {
  Array.prototype.$flatMap = function(cb) {
    return this.map(cb).reduce(
      (destArray, array) => destArray.concat(array),
      []
    );
  };
}

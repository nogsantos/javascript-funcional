import { handleStatus } from "../utils/promise-helpers.js";
import { partialize, pipe } from "../utils/operators.js";
import { Maybe } from "../utils/maybe.js";
const API = `http://localhost:3000/notas`;

/**
 * Pensando um paradigma funcional, cria-se as funções que substituem o encadeamento das funções.
 *
 * Cada função recebe o tipo monádico
 */
const getItemsFromNotas = notasM =>
  notasM.map(notas => notas.$flatMap(nota => nota.itens));
const filterItemsByCode = (code, itemsM) =>
  itemsM.map(items => items.filter(item => item.codigo == code));
const sumItemsValue = itemsM =>
  itemsM.map(items => items.reduce((total, item) => total + item.valor, 0));

/**
 * Mesmo resultado do código acima, porém, resultado o encadeamento de funções.
 *
 * Segundo Demeter:
 * O problema dessa cadeia, é que a classe que contém essa expressão, conhece muito sobre o comportamento da classe A,
 * depois da classe B, até D. Se alguma delas mudar, a mudança será propagada para muitos lugares.
 *
 * Diminuir a quantidade de invocações como essas ajuda você a encapsular melhor o
 * comportamento e o funcionamento interno das classes.
 *
const sumItems = code => notas =>
  notas
    .$flatMap(nota => nota.itens)
    .filter(item => item.codigo === code)
    .reduce((total, item) => total + item.valor, 0);
*/

export const notasService = {
  listAll() {
    return fetch(API)
      .then(handleStatus)
      .then(notas => Maybe.of(notas))
      .catch(err => {
        console.log(err);
        return Promise.reject("Não foi possível obter as notas fiscais");
      });
  },

  sumItems(code) {
    const sumItems = pipe(
      getItemsFromNotas,
      partialize(filterItemsByCode, code),
      sumItemsValue
    );
    return this.listAll()
      .then(sumItems)
      .then(result => result.getOrElse(0));
  }
};

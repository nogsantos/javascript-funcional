/**
 * Tips:
 *
 * Closure
 * A função retornada lembrará do parâmetro recebido pela função mais externa.
 * Uma função retornada tem a capacidade de lembrar do contexto no qual ela foi declarada, ou seja,
 * ela lembrará do contexto dos parâmetros passado para a função que a criou.
 *
 * SumItems recebe como parâmetro um código que devolve uma nova função que recebe como parâmetro as notas
 */

export const pipe = (...fns) => value =>
  fns.reduce((previousValue, fn) => fn(previousValue), value);

/**
 * Podemos realizar a partial application de funções facilmente através da função Function.bind():
 * A função Function.bind cria uma nova função. Seu primeiro argumento é o valor de `this` que desejamos que a
 * nova função utilize como contexto. Porém, como declaramos a função através de arrow function que não aceita a
 * modificação do seu contexto, simplesmente passamos null.
 * Mesmo que tivéssemos passado outro valor ele seria ignorado.
 */
export const partialize = (fn, ...params) => fn.bind(null, ...params);

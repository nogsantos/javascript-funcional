/**
 * Tips:
 *
 * Closure
 * A função retornada lembrará do parâmetro recebido pela função mais externa.
 * Uma função retornada tem a capacidade de lembrar do contexto no qual ela foi declarada, ou seja,
 * ela lembrará do contexto dos parâmetros passado para a função que a criou.
 *
 */

/**
 * SumItems recebe como parâmetro um código que devolve uma nova função que recebe como parâmetro as notas
 *
 * @param  {...any} fns N...Functions
 */
export const pipe = (...fns) => value =>
  fns.reduce((previousValue, fn) => fn(previousValue), value);

/**
 * Podemos realizar a partial application de funções facilmente através da função Function.bind():
 * A função Function.bind cria uma nova função. Seu primeiro argumento é o valor de `this` que desejamos que a
 * nova função utilize como contexto. Porém, como declaramos a função através de arrow function que não aceita a
 * modificação do seu contexto, simplesmente passamos null.
 * Mesmo que tivéssemos passado outro valor ele seria ignorado.
 *
 * @param {Function} fn Target function
 * @param  {...any} params Parms
 */
export const partialize = (fn, ...params) => fn.bind(null, ...params);

/**
 * Define o limite máximo de chamadas a api.
 *
 * A função retornada lembrará dos parâmetros recebidos pela função takeUntil que a retornou.
 * Essa memória ocorre devido ao suporte de closure na linguagem JavaScript.
 *
 * @param {Number} times Quantidade de vezes
 * @param {Function} fn Callback function
 */
export const takeUntil = (times, fn) => () => times-- > 0 && fn();

/**
 * Filtra a quantidade de cliques do usuário dentro de uma janela de tempo.
 * Por exemplo, se ele clicar diversas vezes no botão dentro da janela de tempo de meio segundo nós
 * ignoraremos todos os cliques. Apenas o clique que ultrapassar meio segundo sem que um novo clique seja
 * realizado disparará a ação do botão. Em suma, queremos aplicar o pattern Debounce.
 *
 * @param {Number} milliseconds Tempo entre as execuções
 * @param {Function} fn Função de callback
 */
export const debounceTime = (milliseconds, fn) => {
  let timer = 0;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, milliseconds);
  };
};

/**
 * Em um fetch, resolve retornando valor em json caso status ok, ou rejeita retornando o texto de erro.
 */
export const handleStatus = res =>
  res.ok ? res.json() : Promise.reject(res.statusText);

/**
 * Log e retorna o valor da promise
 */
export const log = value => {
  console.log(value);
  return value;
};

/**
 * Time out em promise.
 * Por padrão, não há implementação de timeout em promises, dessa forma, para criar essa implementação, pode-se
 * utilizar o método Promise.race. Ele retorna a primera promise, dentro da 'corrida' que foi resolvida.
 * No caso, estamos passando a promisse alvo e o tempo para que ela seja resolvida, caso não ocorra, o setimeout envia a promise rejeitada.
 *
 * @param {Number} milliseconds Timeout timer
 * @param {Promise} promise To be executed
 */
export const timeoutPromise = (milliseconds, promise) => {
  const timeout = new Promise((resolve, reject) =>
    setTimeout(
      () => reject(`Operation time out exceeded Limit ${milliseconds}ms`),
      milliseconds
    )
  );
  return Promise.race([timeout, promise]);
};

/**
 * Permite realizar um atraso entre as chamadas encadeada à função `then()`
 *
 * A função delay recebe como parâmetro o tempo em milissegundos do delay e possui como retorno outra função.
 * Esta nova função retornada, que lembrará do tempo a ser respeitado, recebe como parâmetro o resultando
 * da chamada à then() anterior.
 * Essa chamada pode ou não retornar um valor. Então, a função ao ser invocada retornará uma nova Promise
 * que será resolvida através de uma chamada de setTimeout.
 * Quando resolvida, passará o valor recebido da chamada then() anterior para sua próxima chamada encadeada.
 *
 * @param {Number} milliseconds
 */
export const delay = milliseconds => data =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(data), milliseconds)
  );

/**
 *
 * A função retry receberá uma função que ao ser chamada, deve retornar uma nova Promise com a operação
 * que desejamos realizar, o número de tentativas e o intervalo de tempo entre essas tentativas.
 *
 * Foi necessário realizar delay(time)(), porque delay retorna uma função que ao ser chamada devolve uma
 * Promise e, a chamada encadeada à then() só será feita depois do tempo do delay ter expirado.
 *
 * @param {Number} retries Quantidade de tentativas
 * @param {Number} milliseconds Intervalo entre as tetativas
 * @param {Function} fn Função que ao ser chamada, retorna uma promise
 */
export const retry = (retries, milliseconds, fn) =>
  fn().catch(err => {
    console.log("Retring", retries);
    return delay(milliseconds)().then(() =>
      retries > 1 ? retry(--retries, milliseconds, fn) : Promise.reject(err)
    );
  });

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

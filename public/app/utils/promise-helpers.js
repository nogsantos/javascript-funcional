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

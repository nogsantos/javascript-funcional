/**
 * Variável events vive no escopo do módulo.
 * Essa abordagem evitará que outra parte do nosso código, que não seja o próprio `EventEmitter` interaja e
 * bagunce com events.
 * Em outras palavras, estamos encapsulando a mapa de eventos.
 */
const events = new Map();

export const EventEmitter = {
  /**
   * Get an event
   *
   * @param {String} event
   * @param {String} listener
   */
  on(event, listener) {
    if (!events.has(event)) {
      events.set(event, []);
    }
    events.get(event).push(listener);
  },
  /**
   * Add an event to listners
   *
   * Quando for chamado, ele obterá a lista de listeners para o event passado como parâmetro.
   * Se o event ainda não foi criado por nenhum listener, nada acontecerá.
   * Cada listener associado ao event será chamado recebendo como parâmetro o dado recebido pela função emit.
   * Esse passo é fundamental, caso contrário os listeners não terão acesso ao dado emitido com o event
   *
   * @param {String} event
   * @param {Any} data
   */
  emit(event, data) {
    const listeners = events.get(event);
    if (listeners) {
      listeners.forEach(listener => listener(data));
    }
  }
};

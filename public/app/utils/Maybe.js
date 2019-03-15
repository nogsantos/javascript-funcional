/**
 * Classe Maybe é um tipo monádico.
 *
 * Essa classe nomad embrulha um dado para evitar acesso ao dado `null` ou `undefined`.
 * Uma mônada brilha quando estamos dentro da programação funcional, pois ela evita a proliferação de if nas funções,
 * principalmente naquelas envolvidas em composições.
 *
 * A mônada Maybe é um Functor.
 * O Functor possui métodos especializados para interagir/modificar o valor.
 *
 */
export class Maybe {
  constructor(value) {
    this._value = value;
  }

  /**
   * Static "singleton" injection
   *
   * @param {Any} value
   */
  static of(value) {
    return new Maybe(value);
  }

  /**
   * Check the value attribute
   */
  isNothing() {
    return this._value === null || this._value === undefined;
  }

  /**
   * Do an action and returns a new instance of the object
   *
   * @param {Function} fn
   */
  map(fn) {
    if (this.isNothing()) {
      return Maybe.of(null);
    }
    const value = fn(this._value);
    return this.of(value);
  }

  /**
   * Get final value
   *
   * @param {String | Number} value
   */
  getOrElse(value) {
    return this.isNothing() ? value : this._value;
  }
}

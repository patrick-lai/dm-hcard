/***
 * Stub store
 * This is a temporary memory store with the intention that it gets replaced
 * with a real DB in production
 */

// Laziest way is to just use a map
class Store {
  _store = new Map();

  // Expose some methods;
  get = key => this._store.get(key);
  set = (key, value) => this._store.set(key, value);
  update = (key, delta) => {
    const original = this.get(key) || {};
    this.set(key, { ...original, ...delta });
  };
}

export default new Store();

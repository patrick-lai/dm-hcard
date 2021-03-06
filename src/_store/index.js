/***
 * Stub store
 * This is a temporary memory store with the intention that it gets replaced
 * with a real DB in production
 */

class Store {
  // Laziest way is to just use a map
  _store = new Map();

  // NOTE - make these async as they are like to be in reality
  get = key => Promise.resolve(this._store.get(key) || {});
  set = (key, value) => Promise.resolve(this._store.set(key, value));

  // Spec says 'save' but 'update' or 'patch' may make more sense
  save = async (key, delta) => {
    const original = (await this.get(key)) || {};
    return this.set(key, { ...original, ...delta });
  };
}

export default new Store();

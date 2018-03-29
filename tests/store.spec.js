/***
 * Tests our mock store
 */

import store from '../src/_store';

describe('Mock store', () => {
  it('Should be able to set and get something', () => {
    const key = 'key';
    const value = 'value';
    expect(store.get(key)).toBe(undefined);
    store.set(key, value);
    expect(store.get(key)).toEqual(value);
  });

  it('Should be able to patch a value via update method', () => {
    const key = 'key2';
    const value = { a: 'a' };
    expect(store.get(key)).toBe(undefined);
    store.set(key, value);
    expect(store.get(key)).toEqual(value);
    store.update(key, { b: 'b' });
    expect(store.get(key)).toEqual({ a: 'a', b: 'b' });
  });
});

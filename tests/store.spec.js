/***
 * Tests our mock store
 */

import store from '../src/_store';

describe('Mock store', () => {
  it('Should be able to set and get something', async done => {
    const key = 'key';
    const value = 'value';
    expect(await store.get(key)).toEqual({});
    await store.set(key, value);
    expect(await store.get(key)).toEqual(value);
    done();
  });

  it('Should be able to patch a value via update method', async done => {
    const key = 'key2';
    const value = { a: 'a' };
    expect(await store.get(key)).toEqual({});
    await store.set(key, value);
    expect(await store.get(key)).toEqual(value);
    await store.save(key, { b: 'b' });
    expect(await store.get(key)).toEqual({ a: 'a', b: 'b' });
    done();
  });
});

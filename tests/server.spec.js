/***
 * Tests our basic server
 * Snapshot style testing
 */

import supertest from 'supertest-session';
import server from '../src';

const session = supertest(server);

describe('Hcard server', () => {
  // Tear down the express app
  afterAll(async done => {
    await server.close();
    done();
  });

  it('Should be able to serve static css', async done => {
    const res = await session.get('/css/main.css');
    expect(res.status).toEqual(200);
    expect(res.text).toMatchSnapshot();
    done();
  });

  it('Should be able to serve static img', async done => {
    const res = await session.get('/img/avatar.png');
    expect(res.status).toBe(200);
    expect(res.body).not.toEqual({});
    done();
  });

  it('Should be able to serve our html from root', async done => {
    const res = await session.get('/');
    expect(res.status).toBe(200);
    expect(res.text).toMatchSnapshot();
    done();
  });

  it('Should correctly fill out the form from url params', async done => {
    const params =
      'givenName=Sam&surname=Fairfax&email=sam.fairfax%40fairfaxmedia.com.au&phone=0292822833&houseNumber=100&street=Harris+Street&suburb=Pyrmont&state=NSW&postcode=2009&country=Australia';
    const res = await session.get('?' + params);
    expect(res.status).toBe(200);
    expect(res.text).toMatchSnapshot();
    done();
  });

  xit('Should be able to update', () => {});
  xit('Should be able to submit', () => {});
  xit('Should be able to persist session data during reload', () => {});
});

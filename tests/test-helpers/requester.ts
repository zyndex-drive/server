import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const { LOCAL_SECRET, SECRET } = process.env;

export function getRequester(URL, path, callback) {
  return chai
    .request(URL)
    .get(path)
    .set('x-secret-pass', SECRET)
    .set('x-local-dev-pass', LOCAL_SECRET)
    .end(callback);
}

export function postRequester(URL, path, data, callback) {
  return chai
    .request(URL)
    .post(path)
    .set('x-secret-pass', SECRET)
    .set('x-local-dev-pass', LOCAL_SECRET)
    .send(data)
    .end(callback);
}

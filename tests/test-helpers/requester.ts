import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

export default function (URL, path, callback) {
  return chai.request(URL).get(path).end(callback);
}

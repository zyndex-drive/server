import chai from 'chai';
import chaiHttp from 'chai-http';
import { getRequester } from './requester';

chai.use(chaiHttp);
chai.should();

export default function pingTestServer(done) {
  const { URL } = process.env;
  return getRequester(URL, '/', function (err, response) {
    if (!err && response.status === 200) {
      response.should.have.status(200);
      response.should.be.a('object');
      response.body.should.have.a.property('status').to.be.eql(200);
      response.body.should.have.a
        .property('data')
        .to.be.eql('Server Successfully Started');
      done();
    } else {
      try {
        err.should.have.status(300);
        done();
      } catch (e) {
        done(e);
      }
    }
  });
}

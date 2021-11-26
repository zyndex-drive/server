import { step } from 'mocha-steps';
import { getRequester } from '../helpers/requester';

describe('Ping the Test Server', () => {
  step('Pings the Server and Gets the Status of the Server', (done) => {
    const { TESTURL } = process.env;
    return getRequester(TESTURL, '/', function (err, response) {
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
  });
});

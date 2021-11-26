import { step } from 'mocha-steps';
import { postRequester } from '../../../helpers/requester';

const { TESTURL } = process.env;

describe('Test Setup Route - Get all Endpoints', () => {
  step('Get all Routes Under Setup Route', (done) => {
    postRequester(TESTURL, '/setup/endpoints', {}, (err, response) => {
      if (!err && response.status === 200) {
        response.body.should.be.a('object');
        done();
      } else {
        done(err);
      }
    });
  });
});

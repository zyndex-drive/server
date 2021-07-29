import { step } from 'mocha-steps';
import requester from '../../test-helpers/requester';

const { URL } = process.env;

describe('Testing First Setup Route', () => {
  step('Get all Routes Under Setup Route', (done) => {
    requester(URL, '/setup', (err, response) => {
      if (!err) {
        response.data.should.be.a('object');
        done();
      } else {
        done(err);
      }
    });
  });
});

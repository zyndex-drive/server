import chai from 'chai';
import chaiHttp from 'chai-http';
import requester from './helpers/requester';
import dotenv from 'dotenv';

chai.use(chaiHttp);
chai.should();

dotenv.config({
  path: './.env.test',
});

const { URL } = process.env;

describe('Ping the Test Server', () => {
  it('Pings the Server and Gets the Status of the Server', (done) => {
    requester(URL, '/', function (err, response) {
      if (!err) {
        response.should.have.status(200);
        response.text.should.be.eql('Init the Server');
        done();
      } else {
        try {
          err.should.have.status(300);
          done();
        } catch (e) {
          throw new Error(
            `It Looks like your Test Server is Not Active. See Below for More Details: \n${e}`,
          );
        }
      }
    });
  });
});

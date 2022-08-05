import { shortuid } from '../../src/plugins/misc/uid';

describe('Testing Unique ID Generator', () => {
  it('Generate a Short UID', (done) => {
    const id = shortuid();
    id.should.be.a('string');
    id.length.should.be.eql(8);
    done();
  });
});

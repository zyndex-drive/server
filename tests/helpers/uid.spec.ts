import uid, { shortuid } from '../../helpers/uid';

describe('Testing Unique ID Generator', () => {
  it('Generate a UID String with MD5 (No Prefix)', (done) => {
    uid('supercoool', 'md5')
      .then((string) => {
        string.should.be.a('string');
        string.length.should.be.equal(32);
        done();
      })
      .catch(done);
  });

  it('Generate a UID String with MD5', (done) => {
    uid('supercoool', 'md5', 'testing')
      .then((string) => {
        const uidregex = /(?<prefix>testing@)(?<hash>[A-Za-z0-9].+)/;
        const hashRegex = /^[a-f0-9]{32}$/i;
        uidregex.test(string).should.be.true;
        const { hash } = string.match(uidregex).groups;
        hashRegex.test(hash).should.be.true;
        done();
      })
      .catch(done);
  });

  it('Generate a UID String with SHA1 (No Prefix)', (done) => {
    uid('supercoool', 'sha1')
      .then((string) => {
        const hashRegex = /([0-9a-f]{6})([0-9a-f]{34})/;
        string.should.be.a('string');
        hashRegex.test(string).should.be.true;
        done();
      })
      .catch(done);
  });

  it('Generate a UID String with SHA1', (done) => {
    uid('supercoool', 'sha1', 'testing')
      .then((string) => {
        const uidregex = /(?<prefix>testing@)(?<hash>[A-Za-z0-9].+)/;
        const hashRegex = /([0-9a-f]{6})([0-9a-f]{34})/;
        uidregex.test(string).should.be.true;
        const { hash } = string.match(uidregex).groups;
        hashRegex.test(hash).should.be.true;
        done();
      })
      .catch(done);
  });

  it('Generate a Short UID', (done) => {
    const id = shortuid();
    id.should.be.a('string');
    id.length.should.be.eql(10);
    done();
  });
});

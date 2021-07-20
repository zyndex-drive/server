import { expect } from 'chai';
import uid from '@helpers/uid';

describe('Sample Testing', () => {
  it('Checks Sample text', () => {
    expect(uid('something')).to.be.string;
  });
});

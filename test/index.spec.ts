import {
  perfmark
} from './../src/index';
import {
  expect
} from 'chai';

describe('perfmark', () => {

  it('Returns `hello universe`', () => {
    expect(perfmark()).to.equal('hello universe');
  });

});

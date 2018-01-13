/**
 * Created by Vadym Yatsyuk on 13.01.18
 */
'use strict';
const assert = require('chai').assert;
const sinon = require('sinon');

const Block = require('../block');

describe('Block', () => {
  it('should create Block', () => {
    const block = new Block();
    assert.isNotNull(block);
    assert.typeOf(block, 'object');
    assert.instanceOf(block, Block);
  });

  it('should properly set fields', () => {
    const data = { field: 'value' };
    const previousHash = '0001230';
    const index = 1;
    const timestamp = new Date().getTime();
    const block = new Block(data, previousHash, index, timestamp);

    assert.deepEqual(data, block.data);
    assert.equal(previousHash, block.previousHash);
    assert.equal(index, block.index);
    assert.equal(timestamp, block.timestamp);
  });

  it('should call generate hash on create', () => {
    sinon.spy(Block.prototype, 'generateHash');
    const block = new Block();

    assert.isTrue(block.generateHash.calledOnce);
    block.generateHash.restore();
  });

  it('should set hash', () => {
    const hash = '0000000';
    sinon.stub(Block.prototype, 'generateHash').returns(hash);
    const block = new Block();

    assert.equal(block.hash, hash);
    block.generateHash.restore();
  });
});
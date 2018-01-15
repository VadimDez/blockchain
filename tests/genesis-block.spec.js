/**
 * Created by Vadym Yatsyuk on 15.01.18
 */
'use strict';
const assert = require('chai').assert;

const GenesisBlock = require('../genesis-block');

describe('GenesisBlock' , () => {
  let genesisBlock;

  beforeEach(() => {
    genesisBlock = new GenesisBlock();
  });

  it('should create genesis block', function () {
    assert.isNotNull(genesisBlock);
    assert.typeOf(genesisBlock, 'object');
    assert.instanceOf(genesisBlock, GenesisBlock);
  });

  it('should generate static hash with 64 zeros', () => {
    const hash = new Array(65).join('0');
    assert.equal(genesisBlock.hash, hash);
  });

  it('should generate block with empty object as dara', () => {
    assert.deepEqual(genesisBlock.data, {});
  });

  it('should set previousHash to null', () => {
    assert.equal(genesisBlock.previousHash, null);
  });

  it('should set index to 0', () => {
    assert.equal(genesisBlock.index, 0);
  });

  it('should set timestamp to 1515879838967', () => {
    assert.equal(genesisBlock.timestamp, 1515879838967);
  });
});

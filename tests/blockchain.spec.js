/**
 * Created by Vadym Yatsyuk on 15.01.18
 */
'use strict';
const assert = require('chai').assert;

const Blockchain = require('../blockchain');
const Genesisblock = require('../genesis-block');
const Block = require('../block');

describe('Blockchain', () => {
  let blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  describe('create', () => {
    it('should create blockchain', () => {
      assert.isNotNull(blockchain);
      assert.typeOf(blockchain, 'object');
      assert.instanceOf(blockchain, Blockchain);
    });

    it('should set genesis block as first block', () => {
      const firstBlock = blockchain.blocks[0];

      assert.isNotNull(firstBlock);
      assert.instanceOf(firstBlock, Genesisblock);
    });
  });

  describe('add', () => {
    it('should add block to the blockchain', function () {
      const data = { test: 'tes' };

      blockchain.add(data);

      const newBlock = blockchain.blocks[1];
      assert.equal(blockchain.blocks.length, 2);
      assert.equal(newBlock.index, 1);
      assert.equal(newBlock.data, data);
    });
  });

  describe('block validation', () => {
    let lastBlock
    beforeEach(() => {
      lastBlock = new Block({}, '0', 1, 1);
    });

    it('should validate if previous hash matches', function () {
      assert.isTrue(Blockchain.isValidBlock(new Block({}, lastBlock.hash, 2, 1), lastBlock));
      assert.isFalse(Blockchain.isValidBlock(new Block({}, '123', 2, 1), lastBlock));
    });

    it('should validate index', function () {
      assert.isTrue(Blockchain.isValidBlock(new Block({}, lastBlock.hash, 2, 1), lastBlock));
      assert.isFalse(Blockchain.isValidBlock(new Block({}, lastBlock.hash, 1, 1), lastBlock));
    });

    it('should validate that both blocks are not null', function () {
      const newBlock = new Block({}, lastBlock.hash, 2, 1);

      assert.isFalse(Blockchain.isValidBlock(null, null));
      assert.isFalse(Blockchain.isValidBlock(null, lastBlock));
      assert.isFalse(Blockchain.isValidBlock(newBlock, null));
      assert.isTrue(Blockchain.isValidBlock(newBlock, lastBlock));
    });

    it('should validate hash', function () {
      let newBlock = new Block({}, lastBlock.hash, 2, 1);

      assert.isTrue(Blockchain.isValidBlock(newBlock, lastBlock));

      newBlock.data = { test: 'asd' };
      assert.isFalse(Blockchain.isValidBlock(newBlock, lastBlock));
    });
  });

  describe('blockain validation', () => {
    it('should validate genesis block', () => {
      assert.isTrue(blockchain.isValidBlockchain());

      blockchain.blocks = [];
      assert.isFalse(blockchain.isValidBlockchain());
    });

    it('should validate all blocks', function () {
      blockchain.add({ a: 1 });
      blockchain.add({ b: 1 });

      assert.isTrue(blockchain.isValidBlockchain());

      blockchain.blocks[1].data = { a: 2 };
      assert.isFalse(blockchain.isValidBlockchain());
    });
  });
});
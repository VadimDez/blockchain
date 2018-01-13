/**
 * Created by Vadym Yatsyuk on 11.01.18
 */

const Block = require('./block');
const GenesisBlock = require('./genesis-block');

class Blockchain {
  constructor() {
    this.blocks = [new GenesisBlock()];
  }

  add(data) {
    const count = this.blocks.length;
    const lastBlock = this.blocks[count - 1];
    const timestamp = (new Date()).getTime();

    let newBlock = new Block(data, lastBlock.hash, count, timestamp);

    if (Blockchain.isValidBlock(newBlock, lastBlock)) {
      this.blocks.push(newBlock);
    }
  }

  static isValidBlock(block, previousBlock) {
    if (!block || !previousBlock) {
      return false;
    }

    if (block.index !== previousBlock.index + 1) {
      return false;
    }

    if (block.previousHash !== previousBlock.hash) {
      return false;
    }

    return block.hash === block.generateHash();
  }

  isValidBlockchain() {
    if (JSON.stringify(this.blocks[0]) !== JSON.stringify(new GenesisBlock())) {
      return false;
    }

    const blockchainLength = this.blocks.length;

    for (let i = 1; i < blockchainLength; i++) {
      if (!Blockchain.isValidBlock(this.blocks[i], this.blocks[i - 1])) {
        return false;
      }
    }

    return true;
  }
}

module.exports = Blockchain;
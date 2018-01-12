/**
 * Created by Vadym Yatsyuk on 11.01.18
 */

const Block = require('./block');
const GenesisBlock = require('./genesis-block');

class BlockChain {
  constructor() {
    this.blocks = [new GenesisBlock()];
  }

  add(data) {
    const lastHash = this.blocks[this.blocks.length - 1].hash;
    let newBlock = new Block(data, lastHash);

    this.blocks.push(newBlock);
  }
}

module.exports = BlockChain;
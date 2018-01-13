/**
 * Created by Vadym Yatsyuk on 11.01.18
 */
const SHA256 = require('crypto-js/sha256');

class Block {
  constructor(data, previousHash, index, timestamp) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.nonce = 0;
    this.previousHash = previousHash;

    this.hash = this.generateHash();
  }

  generateHash() {
    return SHA256(`${ this.index }${ this.timestamp }${ JSON.stringify(this.data) }${ this.previousHash }${ this.nonce }`).toString();
  }
}

module.exports = Block;
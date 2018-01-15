/**
 * Created by Vadym Yatsyuk on 12.01.18
 */

const Block = require('./block');

class GenesisBlock extends Block {
  constructor() {
    super({}, null, 0, 1515879838967);
  }

  generateHash() {
    return new Array(65).join('0');
  }
}

module.exports = GenesisBlock;
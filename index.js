/**
 * Created by Vadym Yatsyuk on 12.01.18
 */

const BlockChain = require('./blockchain');

let blockChain = new BlockChain();

blockChain.add({
  value: 1
});

blockChain.add({
  value: 2
});

blockChain.blocks.forEach(block => {
  console.log(JSON.stringify(block));
});

/**
 * Created by Vadym Yatsyuk on 12.01.18
 */

const Blockchain = require('./blockchain');

let blockchain = new Blockchain();

blockchain.add({
  value: 1
});

blockchain.add({
  value: 2
});

blockchain.blocks.forEach(block => {
  console.log(JSON.stringify(block));
});

console.log('Is blockchain valid?', blockchain.isValidBlockchain());

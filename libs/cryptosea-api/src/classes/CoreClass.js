const Web3 = require('web3');

module.exports = class {
  constructor(provider) {
    this.web3 = new Web3(provider);
    this.eth = this.web3.eth;
  }
  // 테스트용
  getBlock() {
    return this.eth.getBlock(999);
  }
  async connectWallet() {
    this.accounts = await this.eth.getAccounts();
    return this; // . 또는 then으로 이어서 받아서 사용할 수 있도록
  }
};

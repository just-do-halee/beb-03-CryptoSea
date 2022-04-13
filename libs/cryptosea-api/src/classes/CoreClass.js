const Web3 = require("web3");
const erc721Abi = require("../erc721Abi");

module.exports = class {
  constructor(
    provider,
    cryptoseaContAddr = "0x84b7247e5B2fca3AFbffb541199A967fcff13c9a"
  ) {
    this.provider = provider;
    this.web3 = new Web3(provider);
    this.eth = this.web3.eth;
    this.methods = new this.eth.Contract(erc721Abi, cryptoseaContAddr).methods;
  }

  async connectWallet(localPrivKey) {
    if (this.provider.enable) {
      // there is browser provider = meta mask
      const [account] = await this.provider.enable();
      this.account = account;
      return this;
    }

    if (localPrivKey === undefined) return this;

    // local
    const { address } = await this.eth.accounts.privateKeyToAccount(
      localPrivKey
    );
    this.account = address;
    return this;
  }

  //토큰 uri호출
  async getTokenURI(tokenId) {
    const result = await this.methods.tokenURI(tokenId).call();
    return result;
  }

  //발행되어있는 토큰 모두 조회
  async getTotalSupply() {
    const name = await this.methods.name().call();
    const symbol = await this.methods.symbol().call();
    const totalSupply = await this.methods.totalSupply().call();
    let arr = [];
    for (let i = 1; i <= totalSupply; i++) {
      arr.push(i);
    }

    for (let tokenId of arr) {
      let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
      if (String(tokenOwner).toLowerCase() === account) {
        let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
        setErc721list((prevState) => {
          return [...prevState, { name, symbol, tokenId, tokenURI }];
        });
      }
    }
  }

  async mintNFT(tokenURI) {
    const result = await this.methods.mintNFT(this.account, tokenURI).send({
      from: this.account,
      gas: 5000000,
    });

    return result;
  }

  //각 토큰의 오너 주소를 받아온다
  async ownerOf(tokenId) {
    const result = await this.methods.ownerOf(tokenId).call();

    return result;
  }
  //각 토큰의 오너 주소를 받아온다
  async owner() {
    const result = await this.methods.owner().call();

    return result;
  }

  //트랜잭션 확인
  async getTransaction(txHash) {
    /* txHash =
      "0xc2d6ab845405783ae61d96a598ecf9f44886538c930f46d7ac816b10a094a540"; */

    const tx = await this.eth.getTransaction(txHash);

    const inputData = tx.input;
    let removed = `0x${inputData.substr(10)}`;

    const result = this.eth.abi.decodeParameters(
      [
        { type: "address", name: "recipient" },
        { type: "string", name: "tokenURI" },
      ],
      removed
    );

    tx.input = result;
    return tx;
  }
};

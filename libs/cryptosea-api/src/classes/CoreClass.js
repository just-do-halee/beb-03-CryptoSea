const Utils = require('../functions/utils');
const ethers = require('ethers');
const Web3 = require('web3');
const erc721Abi = require('../../contracts/erc721Abi');
const erc721MarketAbi = require('../../contracts/erc721MarketAbi');
const gas = 2000000;

module.exports = class {
  constructor(
    provider,
    cryptoseaContAddr = '0xEc4B4A77A7DC63B1941c1063C6F25D05170deEb6',
    cryptoseaMarketContAddr = '0x0EB75bF1c272790d4A38E569EBC7c4cD8faf36A8'
  ) {
    this.utils = Web3.utils;
    this.provider = provider;
    this.web3 = new Web3(provider);
    this.eth = this.web3.eth;
    this.cryptoseaMarketContAddr = cryptoseaMarketContAddr;
    this.methods = new this.eth.Contract(erc721Abi, cryptoseaContAddr).methods;
    this.marketMethods = new this.eth.Contract(
      erc721MarketAbi,
      cryptoseaMarketContAddr
    ).methods;
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
    /* const { address } = await this.eth.accounts.privateKeyToAccount(
      localPrivKey
    ); */
    const { address } = await this.eth.accounts.wallet.add(localPrivKey);

    this.account = address;
    return this;
  }

  //토큰 uri호출
  async getTokenURI(tokenId) {
    const result = await this.methods.tokenURI(tokenId).call();
    return result;
  }

  //발행되어있는 토큰 모두 조회 return = number
  async getTotalSupply() {
    const totalSupply = await this.methods.totalSupply().call();

    return totalSupply;
  }

  //특정인 소유의 nft tokenId 조회
  async listUserNFTs(address) {
    const tokenIds = await this.methods.listUserNFTs(address).call();

    return tokenIds;
  }

  async mintNFT(tokenURI) {
    const result = await this.methods.mintNFT(this.account, tokenURI).send({
      from: this.account,
      gas: 250000,
    });

    this.methods.setApprovalForAll(this.cryptoseaMarketContAddr, 1).call(); //해당 마켓에서 거래 가능하도록 승인

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

  //영수증 트랜잭션 확인
  getTransactionReceipt(txHash) {
    return this.eth.getTransactionReceipt(Utils.attach0x(txHash));
  }
  //트랜잭션 확인
  async getTransaction(txHash) {
    /* txHash =
      "0xc2d6ab845405783ae61d96a598ecf9f44886538c930f46d7ac816b10a094a540"; */

    const tx = await this.eth.getTransaction(Utils.attach0x(txHash));

    if (!tx) return;

    const { input } = tx;

    if (typeof input !== 'string' || input === '0x' || input === '') {
      tx.input = {};
      return tx;
    }

    const result = this.decode(removed, 'tokenURI');

    tx.input = result;
    return tx;
  }

  getLatestBlockNumber() {
    return this.eth.getBlockNumber();
  }

  //price 변환
  parseUnits(price) {
    const result = ethers.utils.parseUnits(price.toString(), 'ether');

    return result;
  }

  //NFT민트후에 마켓에 아이템 생성 (이벤트로 트랜잭션 로그에 기록 남겨주는 방식)
  async createMarketItem(tokenId, price, listingPrice) {
    const result = await this.marketMethods
      .createMarketItem(cryptoseaContAddr, tokenId, price)
      .send({ from: this.account, value: listingPrice, gas: gas });

    return result;
  }

  async getItemIdFromTokenId(tokenid) {
    if (typeof tokenid !== 'number') return {};
    return this.marketMethods.getItemIdFromTokenId(tokenid);
  }

  async getMarketItemFromTokenId(tokenid) {
    if (typeof tokenid !== 'number') return {};
    return this.marketMethods.getMarketItemFromTokenId(tokenid);
  }

  //리스팅 비용 받아오기
  async getListingPrice() {
    const result = await this.marketMethods.getListingPrice().call();
    return result;
  }

  //NFT구입
  async createMarketSale(tokenId, { value: price }) {
    const result = await this.marketMethods
      .createMarketSale(cryptoseaContAddr, tokenId, { value: price })
      .send();

    return result;
  }

  async getBlockNumber(tokenId) {
    const blockNumber = await this.methods.getBlockNumber(tokenId).call();

    return blockNumber;
  }

  decode(value, kind) {
    if (typeof value !== 'string') throw new Error(`${value} is not valid`);
    switch (kind) {
      case 'tokenURI':
        return this.eth.abi.decodeParameters(
          [
            { type: 'address', name: 'recipient' },
            { type: 'string', name: 'tokenURI' },
          ],
          '0x' + value.slice(10)
        );
      case 'price':
        return this.eth.abi.decodeParameters(
          [
            { type: 'address', name: 'seller' },
            { type: 'address', name: 'owner' },
            { type: 'uint256', name: 'price' },
            { type: 'bool', name: 'sold' },
          ],
          value
        );
      default:
        throw new Error(`decoding error: unexpected kind`);
    }
  }
};

//value:''  msg.value
//token price

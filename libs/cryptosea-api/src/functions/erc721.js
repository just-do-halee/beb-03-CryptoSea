const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
var Contract = require("web3-eth-contract");
const erc20Abi = require("../erc20Abi");
const erc721Abi = require("../erc721Abi");
const { User, Nft } = require("../src/models");
const erc721Addr = process.env.ERC721ADDR;
require("dotenv").config();
Contract.setProvider("HTTP://127.0.0.1:7545");
const erc20contractABI = erc20Abi;
const erc721contractABI = erc721Abi;

module.exports = {
  mintNFT: async (
    imgUri,
    createrAddress,
    createrPK,
    ownerId,
    ownerName,
    title,
    desc,
    owner_id
  ) => {
    const server = process.env.TOKEN_ADDRESS;
    const serverPK = process.env.TOKEN_PRIVATEKEY;
    var erc20contract = await new Contract(
      erc20contractABI,
      process.env.ERC20ADDR
    );
    var erc721contract = await new Contract(
      erc721contractABI,
      process.env.ERC721ADDR
    );

    const txData = erc20contract.methods.transfer(server, 10).encodeABI();
    const rawTransaction = {
      from: createrAddress,
      to: process.env.ERC20ADDR,
      gas: 100000,
      data: txData,
    };
    web3.eth.accounts
      .signTransaction(rawTransaction, createrPK)
      .then(async (signTx) => {
        web3.eth.sendSignedTransaction(
          signTx.rawTransaction,
          async (err, req) => {
            if (err) {
              console.log("토큰 감소 오류;;;");
            } else {
              await User.updateOne({ _id: owner_id }, { $inc: { erc20: -10 } });
              const nftData = erc721contract.methods
                .mintNFT(createrAddress, imgUri)
                .encodeABI();
              const rawTransaction = {
                from: server,
                to: process.env.ERC721ADDR,
                gas: 5000000,
                data: nftData,
              };
              web3.eth.accounts
                .signTransaction(rawTransaction, serverPK)
                .then((signTx) => {
                  web3.eth.sendSignedTransaction(
                    signTx.rawTransaction,
                    async (err, req) => {
                      if (err) {
                        console.log("민팅 실패?;;;");
                      } else {
                        const allToken = await erc721contract.methods
                          .totalSupply()
                          .call();
                        const nft = await new Nft({
                          ownerId: owner_id,
                          nftId: allToken,
                          title,
                          desc,
                          img: imgUri,
                          ownerName,
                        });
                        nft.save();
                        return true;
                      }
                    }
                  );
                });
            }
          }
        );
      });
  },
  sendNFT: async (
    ownerPK,
    ownerAddress,
    nftTokenId,
    nftId,
    otherAddress,
    otherUserId,
    ownerUserId
  ) => {
    const server = process.env.TOKEN_ADDRESS;
    var erc721contract = new Contract(
      erc721contractABI,
      process.env.ERC721ADDR
    );
    const nftData = erc721contract.methods
      .transferFrom(ownerAddress, otherAddress, parseInt(nftTokenId))
      .encodeABI();
    const rawTransaction = {
      from: server,
      to: process.env.ERC721ADDR,
      gas: 5000000,
      data: nftData,
    };
    web3.eth.accounts
      .signTransaction(rawTransaction, ownerPK)
      .then((signTx) => {
        web3.eth.sendSignedTransaction(
          signTx.rawTransaction,
          async (err, req) => {
            if (err) {
              console.log("transferFrom에러: ", err);
            } else {
              const nft = Nft.updateOne(
                { _id: nftId },
                {
                  $set: {
                    ownerId: otherUserId,
                    price: 0,
                    buyable: false,
                    prevOwner: ownerUserId,
                  },
                }
              );
              return nft;
            }
          }
        );
      });
  },
};

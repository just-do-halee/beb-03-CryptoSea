const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
var Contract = require("web3-eth-contract");
const erc20Abi = require("../erc20Abi");
const lightwallet = require("eth-lightwallet");
const { User } = require("../src/models");

module.exports = {
  getEth: async (address, userId) => {
    try {
      const sendAccount = process.env.GANACHE_ADDRESS;
      const privateKey = process.env.GANACHE_PRIVATEKEY;
      const tx = {
        from: sendAccount,
        to: address,
        gas: 500000,
        value: web3.utils.toWei("0.1", "ether"),
      };
      await web3.eth.accounts
        .signTransaction(tx, privateKey)
        .then((signedTx) => {
          web3.eth.sendSignedTransaction(
            signedTx.rawTransaction,
            async (err, hash) => {
              if (err) {
                console.log("transaction 실패 : ", err);
              } else {
                const balance = await web3.eth.getBalance(address);
                const user = await User.updateOne(
                  { _id: userId },
                  { eth: parseFloat(web3.utils.fromWei(balance, "ether")) }
                );
                return true;
              }
            }
          );
        });
    } catch (err) {
      console.log(err);
    }
  },
};

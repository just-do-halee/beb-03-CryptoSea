const Web3 = require("web3");
const web3 = new Web3("HTTP://127.0.0.1:7545");
var Contract = require("web3-eth-contract");
const erc20Abi = require("../erc20Abi");
const { User } = require("../src/models");
require("dotenv").config();
Contract.setProvider("HTTP://127.0.0.1:7545");
var contractABI = erc20Abi;
module.exports = {
  serveToken: async (userId, value) => {
    const { address } = await User.findById(userId);
    const sender = process.env.TOKEN_ADDRESS;
    const senderPK = process.env.TOKEN_PRIVATEKEY;
    var contract = await new Contract(contractABI, process.env.ERC20ADDR);
    const txData = contract.methods.transfer(address, value).encodeABI();
    const rawTransaction = {
      to: process.env.ERC20ADDR,
      gas: 100000,
      data: txData,
    };
    web3.eth.accounts
      .signTransaction(rawTransaction, senderPK)
      .then(async (signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          async (err, req) => {
            if (!err) {
              await contract.methods
                .balanceOf(address)
                .call()
                .then((balance) => {
                  console.log(address + " Token Balance: " + balance);
                  const user = User.updateOne(
                    { _id: userId },
                    { erc20: balance }
                  );
                  return user;
                  //   db.collection("users").updateOne({ address: address }, { $set: { erc20: parseInt(balance) } }, () => {
                  //     console.log("업데이트 완료");
                  //   });
                });
            } else {
              console.log("실패");
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  },
  sendToken: async (userId, otherUserId, value) => {
    var contract = await new Contract(contractABI, process.env.ERC20ADDR);

    const user = await User.findById(userId);
    const otherUser = await User.findById(otherUserId);
    const txData = contract.methods
      .transfer(otherUser.address, value)
      .encodeABI();
    const rawTransaction = {
      to: process.env.ERC20ADDR,
      gas: 100000,
      data: txData,
    };
    web3.eth.accounts
      .signTransaction(rawTransaction, user.privateKey)
      .then(async (signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          async (err, req) => {
            if (!err) {
              await contract.methods
                .balanceOf(otherUser.address)
                .call()
                .then(async (balance) => {
                  console.log(otherUserId + " Token Balance: " + balance);
                  await User.updateOne(
                    { _id: otherUserId },
                    { erc20: balance }
                  );
                  await User.updateOne(
                    { _id: userId },
                    { $inc: { erc20: -value } }
                  );
                  return true;
                });
            } else {
              console.log("실패", err);
            }
          }
        );
      })
      .catch((err) => {
        console.log(err);
        return false;
      });
  },
};

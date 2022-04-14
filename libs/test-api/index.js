const CAPI = require("cryptosea-api");

// browser

// await window.ethereum.request({method: 'eth_requestAccounts'});

// const api = CAPI.new(window.ethereum);

const provider = new CAPI.newProvider.HttpProvider(
  "https://ropsten.infura.io/v3/ddf01a2edfc045119de12a1e3fd838ec"
  //"http://127.0.0.1:7545"
);

const api = CAPI.new(provider);

// 인프라라 계정이 없는 듯함

async function run() {
  await api.connectWallet(
    "e5e3e937a6aebd3bc3e1e864faba79fc475ba9a88e2ef6b2e9f69b8be3e5e79b"
  );

  /* const transaction = await api.getTransaction(
    "0x248a2329a1869703857b16176f1fb16265d4a88d2f161aa05f23e71903514ba1"
  ); */

  //console.log(transaction);
  console.log(api.account);

  const result = await api.mintNFT(
    "QmW7rZAbgHM7nbwtPjfSLVZ5TqbfeAfkrM5AeUQS9gAY7t"
  );

  // for (output in tokenId) {
  //   console.log("tokenId: " + JSON.stringify(output));
  // }

  const tokenId = ~~result.events.Transfer.returnValues.tokenId;

  //console.log("tokenId : " + JSON.stringify(tokenId));

  const owner = await api.owner();

  console.log("owner : " + owner);
  //
  const tokenURI = await api.getTokenURI(tokenId);

  console.log("tokenURI : " + tokenURI);

  const ownerOf = await api.ownerOf(tokenId);

  console.log(ownerOf);

  const totalSupply = await api.getTotalSupply();

  console.log("totalSupply : " + totalSupply);
}

run();

//

// web3.eth에 문제는 없음

// api.getBlock().then(console.log);

//api.checkTransaction().then(console.log);
// api.mintNFT().then(console.log);

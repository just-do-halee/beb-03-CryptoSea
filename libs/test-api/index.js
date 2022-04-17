const CAPI = require('cryptosea-api');
// browser
// await window.ethereum.request({method: 'eth_requestAccounts'});
// const api = CAPI.new(window.ethereum);

const provider = new CAPI.newProvider.HttpProvider(
  'https://ropsten.infura.io/v3/ddf01a2edfc045119de12a1e3fd838ec'
  //"http://127.0.0.1:7545"
);
const api = CAPI.new(provider);

async function run() {
  await api.connectWallet(
    'e5e3e937a6aebd3bc3e1e864faba79fc475ba9a88e2ef6b2e9f69b8be3e5e79b'
  );

  console.log(api.account);

  //const listingPrice = await api.getListingPrice();
  //let price = 25000000000000;
  //const marketItem = await api.createMarketItem("2", price, listingPrice);
  //console.log(marketItem);

  // const result = await api.mintNFT(
  //   "QmaGoxHfuuYFyqxSJFXp5fSsHnfa4AUbibJ1ibP5wVYGTa"
  // );
  // console.log(result);
  // const tokenId = ~~result.events.Transfer.returnValues.tokenId;
  // console.log("tokenId:" + tokenId);

  const blockNumber = await api.getBlockNumber(2);
  console.log(blockNumber);

  console.log(
    api.decode(
      '0xeacabe14000000000000000000000000cedcb54391200816d62b880fde171e3b61559d3a0000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002e516d55676d485944524c5a4c67347363337542353571387971594d38774246447058487256774e50547a594b3656000000000000000000000000000000000000',
      'tokenURI'
    )
  );
  /* const result = await api.getTransactionReceipt(
    "0x1e0cda1de9ae3b5e0faddb8d2a7088ec125edf64067891a5bb75b9e56da54370"
  ); */
  // console.log(result.logs[2].data);
  //console.log(api.decode(result.logs[2].data, "price").price);
}

run();

// api.getBlock().then(console.log);

//api.checkTransaction().then(console.log);

/* const transaction = await api.getTransaction(
  "0x248a2329a1869703857b16176f1fb16265d4a88d2f161aa05f23e71903514ba1"
  console.log(transaction);
); */

/* 
  for (output in tokenId) {
     console.log("tokenId: " + JSON.stringify(output));
  }
  //
  const result = await api.mintNFT(
    "QmW7rZAbgHM7nbwtPjfSLVZ5TqbfeAfkrM5AeUQS9gAY7t"
  );

  const tokenId = ~~result.events.Transfer.returnValues.tokenId;
  //
  console.log("tokenId : " + tokenId);

  const owner = await api.owner();

  console.log("owner : " + owner);

  const tokenURI = await api.getTokenURI(tokenId);

  console.log("tokenURI : " + tokenURI);

  const ownerOf = await api.ownerOf(tokenId);

  console.log(ownerOf);

  const totalSupply = await api.getTotalSupply();

  console.log("totalSupply : " + totalSupply);
  */

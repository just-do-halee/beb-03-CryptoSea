const CAPI = require('cryptosea-api');

const provider = new CAPI.newProvider.HttpProvider(
  'https://ropsten.infura.io/v3/ddf01a2edfc045119de12a1e3fd838ec'
);

const api = CAPI.new(provider);

// 인프라라 계정이 없는 듯함
api.connectWallet().then((api) => console.log(api.accounts));

// web3.eth에 문제는 없음
api.getBlock().then(console.log);

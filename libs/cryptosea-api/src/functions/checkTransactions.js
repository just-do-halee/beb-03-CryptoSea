const HttpProvider = require("web3-core");
const web3 = require("@/web3/provider");

const web3Provider = web3.HttpProvider;
const txHash =
  "0xefe4c2c7522edd564d479c9dacc6346191dd958a20f12f1508f51b742605f130";

web3Provider.send(
  {
    method: "debug_traceTransaction",
    params: [txHash, {}],
    jsonrpc: "2.0",
    id: "2",
  },
  (err, result) => {
    console.log(result);
  }
);

const disConnectWallet = () => {
  const accounts = window.ethereum.request({
    method: "eth_requestAccounts",
  });
  if (accounts) {
    window.ethereum.on("disconnect", (err) => {
      console.log(err);
    });
  }
  console.log(accounts);
};

export default disConnectWallet;

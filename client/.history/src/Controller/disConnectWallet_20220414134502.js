const disConnectWallet = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
  if (accounts) {
    window.ethereum.on("disconnect", (err) => {
      console.log(err);
    });
  }
};

export default disConnectWallet;

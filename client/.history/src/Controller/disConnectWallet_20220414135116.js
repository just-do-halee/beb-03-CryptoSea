const disConnectWallet = async (setAccount) => {
  try {
    const accounts = window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts) {
      window.ethereum.on("disconnect", (err) => {
        console.log(err);
      });
    }
    setAccount("");
  } catch (err) {
    console.log(err);
  }
};

export default disConnectWallet;

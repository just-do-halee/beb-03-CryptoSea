const disConnectWallet = async (callback) => {
  try {
    const accounts = window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts) {
      window.ethereum.on("disconnect", (err) => {
        console.log(err);
      });
      window.location.reload();
    }
    callback();
  } catch (err) {
    console.log(err);
  }
};

export default disConnectWallet;

const disConnectWallet = async (callback) => {
  try {
    const accounts = window.ethereum.request({
      method: "eth_requestAccounts",
    });
    if (accounts) {
      window.ethereum.on("disconnect", (err) => {
        console.log(err);
      });
      callback("");
      window.location.reload();
    }
  } catch (err) {
    console.log(err);
  }
};

export default disConnectWallet;

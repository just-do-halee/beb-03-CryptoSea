const disConnectWallet = async () => {
  try {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
  } catch (err) {
    console.log(err);
  }
};

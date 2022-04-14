const disConnectWallet = async (callback) => {
  // try {
  //   const accounts = window.ethereum.request({
  //     method: "eth_requestAccounts",
  //   });
  //   if (accounts) {
  //     window.ethereum.on("disconnect", (err) => {
  //       console.log(err);
  //     });
  //     callback("");
  //     window.location.reload();
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
  await window.ethereum.request({
    method: "wallet_requestPermissions",
    params: [
      {
        eth_accounts: {},
      },
    ],
  });
};

export default disConnectWallet;

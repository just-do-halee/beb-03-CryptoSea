const disConnectWallet = async () => {
  window.ethereum.on("disconnect", (err) => {
    console.log(err);
  });
};

export default disConnectWallet;

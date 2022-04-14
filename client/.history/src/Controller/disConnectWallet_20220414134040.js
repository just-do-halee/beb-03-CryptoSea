const disConnectWallet = async () => {
  window.ethereum.on("disconnect", (err) => {
    console.log(err);
  });
  window.location.reload();
};

export default disConnectWallet;

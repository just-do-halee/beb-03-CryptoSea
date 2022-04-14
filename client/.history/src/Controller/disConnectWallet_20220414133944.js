const disConnectWallet = async () => {
  window.ethereum.on("disconnect");
};

export default disConnectWallet;

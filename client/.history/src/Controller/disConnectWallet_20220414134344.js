const disConnectWallet = async () => {
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
};

export default disConnectWallet;

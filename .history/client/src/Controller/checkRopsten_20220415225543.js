const changeChainId = async () => {
  const chainId = await window.ethereum.request({ method: "eth_chainId" });
  // const handleChainChanged = (chainId) => {
  //   // window.location.reload();
  // };
  if (chainId !== "0x3") {
    window.alert("롭스텐 네트워크로 바꿔주세요.");
    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });
  }
};

export default changeChainId;

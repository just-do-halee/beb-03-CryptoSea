useEffect(async () => {
  saveMyToken();
}, []);

const saveMyToken = async () => {
  const tokenContract = "";
  if (walletType === "eth") {
    tokenContract = await new web3.eth.Contract(erc721Abi, newErc721addr);
  }
  const name = await tokenContract.methods.name().call();
  const symbol = await tokenContract.methods.symbol().call();
  const totalSupply = await tokenContract.methods.totalSupply().call();
  let arr = [];
  for (let i = 1; i <= totalSupply; i++) {
    arr.push(i);
  }

  for (let tokenId of arr) {
    let tokenOwner = await tokenContract.methods.ownerOf(tokenId).call();
    if (String(tokenOwner).toLowerCase() === account) {
      let tokenURI = await tokenContract.methods.tokenURI(tokenId).call();
      setNftlist((prevState) => {
        return [...prevState, { name, symbol, tokenId, tokenURI }];
      });
    }
  }
  setIsLoading(false);
};

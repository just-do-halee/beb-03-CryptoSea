const getAccount = async (callback) => {
  try {
    const account = await window.ethereum.request({ method: "eth_accounts" });
    callback(account);
  } catch (err) {
    console.log(err);
  }
};

export default getAccount;

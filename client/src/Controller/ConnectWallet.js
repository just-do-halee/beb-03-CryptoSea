import { logIn } from "../redux/account/accountSlice";

const connectWallet = async (dispatch) => {
  try {
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    dispatch(logIn(accounts[0]));
  } catch (err) {
    console.log(err);
  }
};

export default connectWallet;

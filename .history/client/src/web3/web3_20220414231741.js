import * as CAPI from "cryptosea-api";

const api = CAPI.new(
  window.ethereum,
  "0xc92ACbE91cB81719db4752e93a732c05a32bFfD6"
);

export default api;

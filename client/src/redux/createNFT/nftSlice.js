import { createSlice } from "@reduxjs/toolkit";

export const nftSlice = createSlice({
  name: "createNFT",
  initialState: {
    name: "",
    description: "",
    image: {},
    attributes: [{ atype: "", akey: "", avalue: "" }],
  },
  reducers: {
    incrementName: (state, action) => {
      state.name = action.payload;
    },
    incrementImgFile: (state, action) => {
      // console.log(action.payload);
      state.image = action.payload;
    },
    incrementLink: (state, action) => {
      state.link = action.payload;
    },
    incrementDescription: (state, action) => {
      state.description = action.payload;
    },
    incrementAttributes: (state, action) => {
      // console.log(action);

      if (action.payload === "plus") {
        state.attributes = [
          ...state.attributes,
          { atype: "", akey: "", avalue: "" },
        ];
      }
      const { atype, akey, avalue, index } = action.payload;
      if (atype !== undefined) {
        state.attributes[index].atype = atype;
      }
      if (akey !== undefined) {
        state.attributes[index].akey = akey;
      }
      if (avalue !== undefined) {
        state.attributes[index].avalue = avalue;
      }
    },
  },
});

export const {
  incrementName,
  incrementLink,
  incrementImgFile,
  incrementDescription,
  incrementAttributes,
} = nftSlice.actions;

export default nftSlice.reducer;

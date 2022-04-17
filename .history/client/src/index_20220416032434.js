import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/App.js";
import store from "./redux/store.js";
import GlobalStyle from "./GlobalStyles";
// import { ApolloProvider } from "react-apollo";
import { ApolloProvider } from "@apollo/client";
import { ApolloClient } from "@apollo/client";
import { createHttpLink } from "@apollo/client";
import { InMemoryCache } from "@apollo/client";
const root = ReactDOM.createRoot(document.getElementById("root"));
const httpLink = createHttpLink({
  uri: "https://b9b5-125-188-189-116.ngrok.io/graphql",
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(), 
});

root.render(
  <BrowserRouter>
    <GlobalStyle />
    <ApolloProvider client={client}>
      <Provider store={store}>
        <App />
      </Provider>
    </ApolloProvider>
  </BrowserRouter>
);

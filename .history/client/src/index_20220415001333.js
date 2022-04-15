import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./components/App.js";
import store from "./redux/store.js";
import GlobalStyle from "./GlobalStyles";
import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
const root = ReactDOM.createRoot(document.getElementById("root"));
const httpLink = createHttpLink({
  uri: "https://b9b5-125-188-189-116.ngrok.io",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

root.render(
  <BrowserRouter>
    <GlobalStyle />
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </BrowserRouter>
);

import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

  const history = useNavigate();

  const onRedirectCallback = (appState) => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : (window.location.href =
            "https://julie-configure.d3pw6ogk003r9g.amplifyapp.com")
    );
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: "https://julie-configure.d3pw6ogk003r9g.amplifyapp.com",
        audience: "https://rbm7x5e9gl.execute-api.us-east-1.amazonaws.com/dev",
        scope: "read:current_user update:current_user_metadata",
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;

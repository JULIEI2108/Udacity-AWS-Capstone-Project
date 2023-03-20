import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

const Auth0ProviderWithHistory = ({ children }) => {
  const domain = process.env.REACT_APP_AUTH0_DOMAIN
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
  const frontendEndpoint = process.env.REACT_APP_FRONTEND_ENDPOINT
  const endpoint = process.env.REACT_APP_APIGATEWAY_ENDPOINT

  const history = useNavigate()

  const onRedirectCallback = appState => {
    history.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : (window.location.href =
            frontendEndpoint)
    )
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: frontendEndpoint,
        audience: endpoint,
        scope: 'read:current_user update:current_user_metadata'
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  )
}

export default Auth0ProviderWithHistory

import React, { useContext, useEffect, useReducer } from 'react'
import reducer from './art_reducer'
import { getItem } from './Api/ItemApi'
import { PublicItem } from './Api/ItemApi'
import { useAuth0 } from '@auth0/auth0-react'
const endpoint = process.env.REACT_APP_APIGATEWAY_ENDPOINT

const initialState = {
  photos: [],
  personalPhotos: []
}
const ArtContext = React.createContext()
export const ArtProvider = ({ children }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0()
  const [state, dispatch] = useReducer(reducer, initialState)
  const fetchPhotos = async () => {
    if (isAuthenticated) {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience:
            endpoint, // Value in Identifier field for the API being called.
          scope: 'read:posts' // Scope that exists for the API being called. You can create these through the Auth0 Management API or through the Auth0 Dashboard in the Permissions view of your API.
        }
      })
      const response = await getItem(token)
      dispatch({ type: 'get_personal_photos', payload: response })
    }
  }

  const deletePhoto = itemId => {
    if (isAuthenticated) {
      console.log('begin')

      dispatch({ type: 'delete_photo', payload: itemId })
    }
  }

  useEffect(() => {
    fetchPhotos()
  }, [isAuthenticated])

  return (
    <ArtContext.Provider value={{ ...state, deletePhoto }}>
      {children}
    </ArtContext.Provider>
  )
}

export const useArtContext = () => {
  return useContext(ArtContext)
}

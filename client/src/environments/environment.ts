export const environment: any = {
  webSocket: {
    socketEndpoint: process.env.REACT_APP_SOCKET_ENDPOINT || 'http://localhost:4000'
  },
  giphy: {
    apiURL: process.env.REACT_APP_GIPHY_API_URL || 'https://api.giphy.com/v1/gifs/search',
    token: process.env.REACT_APP_GIPHY_API_TOKEN || 'zo417xUsT9h8Fj3465qnUGEPOdVk8JlV'
  }
};

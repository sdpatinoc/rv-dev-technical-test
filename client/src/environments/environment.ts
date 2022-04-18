export const environment: any = {
  webSocket: {
    ENDPOINT: process.env.ENDPOINT || 'http://localhost:4000'
  },
  giphy: {
    apiURL: process.env.GIPHY_API_URL || 'https://api.giphy.com/v1/gifs/search',
    token: process.env.GIPHY_API_TOKEN || 'zo417xUsT9h8Fj3465qnUGEPOdVk8JlV'
  }
};

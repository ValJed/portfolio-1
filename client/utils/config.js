console.log('process.env.API_URI ===> ', process.env.API_URI)

export const apiConfig = {
  url: process.env.API_URI || 'http://localhost:7000/api'
}

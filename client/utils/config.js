console.log('process.env.API_URI ===> ', process.env.apiUrl)

export const apiConfig = {
  url: process.env.apiUrl || 'http://localhost:7000/api'
}

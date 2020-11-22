// import axios from 'axios'
import axios from 'axios'
import { apiConfig } from './config.js'

export default async ({
  route,
  method = 'get',
  params,
  data,
  sendToken = true
}) => {
  const token = sendToken && getToken()
  const headers = {
    ...token ? { Authorization: `Bearer ${token}` } : {}
  }

  try {
    return await axios({
      url: `${apiConfig.url}/${route}`,
      method,
      headers,
      ...params && { params },
      ...data && { data }
    })
  } catch (err) {
    console.error((err.response && err.response.statusText) || err)
    return err.response || err
  }
}

const getToken = () => {
  const cookies = document.cookie.split(';')

  const token = cookies
    .find(token => token.split('=')[0].trim() === 'portfolio-token')

  return token ? token.split('=').splice(1).join('=') : ''
}

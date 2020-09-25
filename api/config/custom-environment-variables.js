module.exports = {
  serverConfig: {
    port: 'PORT'
  },
  dbConfig: {
    uri: 'MONGODB_URI',
    database: 'MONGODB_DB'
  },
  corsConfig: {
    origin: 'CORS_ORIGIN'
  },
  cloudinaryConfig: {
    cloud_name: 'CL_NAME',
    api_key: 'CL_API_KEY',
    api_secret: 'CL_API_SECRET'
  },
  googleDriveConfig: {
    client_id: 'GD_CLIENT_ID',
    project_id: 'GD_PROJECT_ID',
    auth_uri: 'GD_AUTH_URI',
    token_uri: 'GD_TOKEN_URI',
    auth_provider_x509_cert_url: 'GD_AUTH_PROVIDER',
    client_secret: 'GD_CLIENT_SECRET'
  }
}

const { google } = require('googleapis')

module.exports = async ({
  client_id,
  client_email,
  private_key,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_secret
}) => {
  const scopes = [
    'https://www.googleapis.com/auth/drive'
  ]
  const auth = new google.auth
    .JWT(
      client_email,
      null,
      private_key,
      scopes
    )

  const drive = google.drive({ version: 'v3', auth })

  try {
    const { data } = await drive.files.list({

    })

    console.log('data ===> ', require('util').inspect(data, { colors: true, depth: 2 }))
  } catch (err) {
    console.error('err ===> ', err)
  }

  // drive.files.list({}, (err, res) => {
  //   if (err) throw err
  //   const files = res.data.files
  //   if (files.length) {
  //     files.map((file) => {
  //       console.log(file)
  //     })
  //   } else {
  //     console.log('No files found')
  //   }
  // })
}

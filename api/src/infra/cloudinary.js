const cloudinary = require('cloudinary').v2

module.exports = (cloudinaryConfig) => {
  cloudinary.config(cloudinaryConfig)

  return cloudinary
}
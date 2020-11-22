## Portfolio

You need to install Node, docker and docker-compose,

You don't need docker and docker-compose if you already have a local mongodb running.

## Setup

First you need to install npm packages for client and for api,
To do that, got to the `api` folder and then run the command `npm install`,

then, do the same thing in the `client` folder.

### Run project

Go into the portfolio folder then run two commands :
* `npm run mongo` to run mongodb as a container wit docker
* `npm run dev` tu run the nuxt server, and the api one

## Hidden config

Add a `local.js` file into `api/config` to add config that you don't want to commit,
like cloudinary config ex :
```javascript
module.exports = {
  cloudinaryConfig: {
    cloud_name: 'name',
    api_key: 'key',
    api_secret: 'secret'
  },
}

```
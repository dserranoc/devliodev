export default {
  port: '3000',
  baseUrl: 'http://localhost',
  mongoUrl: 'mongodb://localhost:27017/devliodev',
  logLevel: 'info',
  saltFactor: 10,
  jwt: {
    secret: '',
    expiresIn: '7d'
  }
}

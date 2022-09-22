export default () => {
  return {
    port: 7096,
    mysql: {
      host: '127.0.0.1',
      port: 3307,
      username: 'root',
      password: 'test1234',
      database: 'rnotes'
    },
    jwt: {
      secret: 'rnotesSecretKey110120',
      expire: '30d'
    }
  }
};

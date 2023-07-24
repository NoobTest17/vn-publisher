const axios = require('axios');

class DatabaseClient {
  constructor() {
    this.host = process.env.HOST
    this.db = process.env.BD
    this.method = process.env.BD_METHOD
  }

  async query(queryString) {
    try {
      const url = this.host + this.db + this.method
      const query = `${url}?q=${encodeURIComponent(queryString)}`;
      const res = await axios.get(query);
      return res.data.items;
    } catch (error) {
      throw new Error(`${error.status}: Ошибка при выполнении запроса: ${error.message}`);
    }
  }

  async queryCreate(data) {
    try {
      const url = this.host + this.db + 'namespaces/auth/'
      const query = `${url}items?format=json`
      const res = await axios.post(query, data, {params: {format: 'json'}});
      return res.data.items;
    } catch (error) {
      throw new Error(`${error.status}: Ошибка при выполнении запроса: ${error.message}`);
    }
  }
}

module.exports = new DatabaseClient

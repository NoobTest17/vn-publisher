const axios = require('axios');

class DatabaseClient {
  constructor() {
    this.host = process.env.HOST
    this.db = process.env.BD
    this.method = process.env.BD_METHOD
  }

  async queryGET(queryString) {
    try {
      const url = this.host + this.db + this.method
      const query = `${url}?q=${encodeURIComponent(queryString)}`;
      const res = await axios.get(query);
      return res.data.items;
    } catch (error) {
      throw new Error(`${error.status}: Ошибка при выполнении запроса: ${error.message}`);
    }
  }

  async queryPOST(nameDataBase, data) {
    try {
      const url = this.host + this.db + `namespaces/${nameDataBase}/`
      const query = `${url}items?format=json`
      const res = await axios.post(query, data, {params: {format: 'json'}});
      return res.data.success;
    } catch (error) {
      throw new Error(`${error.status}: Ошибка при выполнении запроса: ${error.message}`);
    }
  }

  async queryPUT(nameDataBase, data) {
    try {
      const url = this.host + this.db + `namespaces/${nameDataBase}/`
      const query = `${url}items?format=json`
      const res = await axios.put(query, data,{params: {format: 'json'}})
      return res.data.success;
    } catch (error) {
      throw new Error(`${error.status}: Ошибка при выполнении запроса: ${error.message}`);
    }
  }
}

module.exports = new DatabaseClient

'use strict'
const axios = require('axios')

module.exports = {
  fetchIdolData: async (query) => {
    const url = `https://sparql.crssnky.xyz/spql/imas/query?output=json&query=${encodeURIComponent(
      query
    )}`

    try {
      const res = await axios.get(url)
      return res.data.results.bindings
    } catch (err) {
      console.error(err)
      throw err
    }
  }
}

module.exports = {
  get(params) {
    return [200, require(`./mock/${params.params.bCode}.json`)]
  },
  post() {
    return [200]
  },
}

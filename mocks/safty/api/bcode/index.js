module.exports = {
  get(params) {
    return [200, require(`./mock/${params.params.aCode}.json`)]
  },
  post() {
    return [200]
  },
}

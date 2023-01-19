const workerList = require('./Worker.json')

module.exports = {
  get() {
    return [200, workerList]
  }
}

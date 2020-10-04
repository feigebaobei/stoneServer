const jwt = require('jsonwebtoken')
let secret = 'aaabbbcccdddeeefff'

let createToken = (payload) => {
  payload.rtiem = new Date()
  payload.exp = 60 * 60 * 2 * 1000 // 2h
  return jwt.sign(payload, secret)
}
let checkToken = (token) => {
  return new Promise((r, j) => {
    jwt.verify(token, secret, (err, res) => {
      console.log(err, res)
      if(!err) {
        r(res)
      } else {
        j('token verify fail')
      }
    })
  })
}

module.exports = {
  createToken,
  checkToken
}
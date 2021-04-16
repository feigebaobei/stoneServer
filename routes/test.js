const express = require('express');
const router = express.Router();
const utils = require('../lib/utils')
const multer = require('multer')
const cors = require('./cors')

/* GET test listing. */
router.get('/getToken', function(req, res, next) {
  let token = utils.createToken({userName: 'un'})
  res.status(200).json({
    result: true,
    message: '',
    data: token
  })
})

router.get('/checkToken', function(req, res, next) {
  // console.log(req.headers)
  // console.log(req.headers.Authorization)
  // console.log(req.headers.authorization)
  utils.checkToken(req.headers.authorization).then(response => {
    console.log(response)
    res.send('respond with a response');
  })
  .catch(err => {
    console.log(err)
    res.send('respond with a error');
  })
});

router.route('/receiveFile')
  .options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200)
  })
  .get(cors.corsWithOptions, (req, res, next) => {
    res.sent('get')
  })
  .post(cors.corsWithOptions, (req, res, next) => {
    res.sent('post')
  })
  .put(cors.corsWithOptions, (req, res, next) => {
    res.sent('put')
  })
  .delete(cors.corsWithOptions, (req, res, next) => {
    res.sent('delete')
  })

module.exports = router;

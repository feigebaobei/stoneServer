const cors = require('cors')

let corsOptionDelegate = (req, cb) => {
    var corsOptions = {
        origin: true,
        optionsSuccessStatus: 200,
        credentials: true,
        methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
        preflightContinue: false,
        allowHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Type', 'X-Content-Range']
    }
    cb(null, corsOptions)
}
module.exports = {
    cors: cors(),
    corsWithOptions: cors(corsOptionDelegate)
}
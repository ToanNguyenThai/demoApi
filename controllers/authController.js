const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const authController = {
    authorization: (req, res) => {

        const access_token = jwt.sign(req.body, process.env.ACCESS_TOKEN_SECRET)
        res.json({ access_token })
    }
}
module.exports = authController
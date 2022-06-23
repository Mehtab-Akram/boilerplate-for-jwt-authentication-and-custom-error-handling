const jwt = require('jsonwebtoken')
const { BadRequestError } = require('../errors')
require('dotenv').config()
//Check if the user exists in post(login) request.
// If yes create and JWT and send back to the front end.
const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        throw new BadRequestError("Plesae provide username and password");
    }
    const id = new Date().getDate()
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })
    console.log(req.body)
    res.status(200).json({ msg: "user Created!", token })
}
// Setup authentication so that only the users with valid JWT can access the dashboard.
const dashboard = async (req, res) => {

    let luckyNum = Math.round(Math.random() * 100)
    res.status(200).json({ msg: `Hello ${req.user.username}.`, secret: `Here is your authorized data. Your lucky number is ${luckyNum}` })
}

module.exports = {
    login,
    dashboard
}
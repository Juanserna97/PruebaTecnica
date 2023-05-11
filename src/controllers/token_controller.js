const { getToken } = require("../services/token_service");
const jwt = require('jsonwebtoken');

//genera token
const getNewToken = async (req, res) => {
    try {
        const token = await getToken();
        res.status(200).json({
            status: "OK",
            token: token
        });
    } catch (error) {
        res.status(400).json({
            status: "Error",
            message: error.message,
        });
    }
};

//validar token
const validateToken = async (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        jwt.verify(bearerToken, 'secret_key', (err, data) => {
            if (err) {
                res.sendStatus(403);
            } else {
                next();
            }
        })
    } else {
        res.sendStatus(403);
    }
}

module.exports = {
    getNewToken, validateToken
};

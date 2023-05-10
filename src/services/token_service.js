const jwt = require('jsonwebtoken');

//funcion que genera token
const getToken = async () => {
    try {
        user = {id:1};
        const token = await jwt.sign({user},'secret_key')
        return token;
    } catch (error) {
        throw new Error("Error generating token");
    }
};

module.exports = {
    getToken,
};

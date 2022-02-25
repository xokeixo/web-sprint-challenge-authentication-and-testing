const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./secrets');

function buildToken(user){
    const payload ={
        subject: user.id,
        username : user.username,
    }
    const options ={
        expiresIn: '1d',
    };
    const token = jwt.sign(
        payload,
        JWT_SECRET,
        options
    )
    return token;
}

module.exports = buildToken
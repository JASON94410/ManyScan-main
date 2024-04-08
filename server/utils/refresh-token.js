const crypto = require('crypto');

const generateRefreshToken = (userId) => {
    const token = crypto.randomBytes(40).toString('hex');

    return token;
};

module.exports = generateRefreshToken;
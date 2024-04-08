const { v4: uuidv4 } = require('uuid');

const generateResetToken = () => {
    const currentDate = new Date().toISOString();
    const uniqueId = uuidv4();
    return `${currentDate}_${uniqueId}`; 
};

module.exports = generateResetToken;
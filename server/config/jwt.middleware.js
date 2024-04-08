const JWT = require("jsonwebtoken");

module.exports = (req, res, next) => {
    try{
        let userToken = req.headers.authorization.split(' ')[1]; // Check token dans les entetes
        
        if(userToken){
            JWT.verify(userToken, process.env.SECRET_TOKEN_KEY, {
            }, (error, data) => {
                if(error){
                    return res.status(500).json({
                        message: "token is not valid",
                        error: error
                    })
                } else{
                    req.data = data;
                    next();
                }
            });
        } else{
        return res.status(500).json({ message: 'Authentication token value failed' });
        }
    } catch(error){
        res.status(500).json({ message: 'The token value is invalid', error: error});
    }
};

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies) {
        token = req.cookies['Token'];
    }
    return token;
};

module.exports = cookieExtractor
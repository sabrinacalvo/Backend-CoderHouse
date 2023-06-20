const passport = require ("passport");

const handlePolicies = (policies) => {
    if(policies.includes('PUBLIC')) {
        return (req, res, next) => {
            next();
        }
    };
    return async (req, res, next) => {
        passport.authenticate('jwt', function(err, user, info) {
            if(err) return next(err);

            if(!user) return res.status(401).json({status: 'error', message: 'Only for registered users'});

            console.log("ROLE: ", user.user.role)
            if(!policies.includes(user.user.role.toUpperCase()))
                return res.status(403).json({status: 'error', message: 'Forbiden access'});
        
            req.user = user.user
            next();
        }) (req, res, next);
    };
};

module.exports = handlePolicies;
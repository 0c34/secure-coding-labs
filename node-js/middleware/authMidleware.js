exports.authMidleware = (req, res, next) => {
    if(!req.session || !req.session.user_id){
        if (req.originalUrl !== '/login') {
            return res.redirect('/login');
        }
    }
    res.locals.user_id = req.session.user_id;
    res.locals.user_name = req.session.user_name;
    res.locals.role = req.session.role
    next();
}
exports.isAdmin = (req, res, next) => {
    if(!req.session || !req.session.user_id){
        if (req.originalUrl !== '/login') {
            return res.redirect('/login');
        }
    }
    if(req.session.role !== 'admin'){
        return res.status(403).send('Forbidden');
    }
    res.locals.user_id = req.session.user_id;
    res.locals.user_name = req.session.user_name;
    res.locals.role = req.session.role
    next();
}
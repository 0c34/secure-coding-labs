exports.authMidleware = (req, res, next) => {
    console.log(req.session.user_id);
    if(!req.session || !req.session.user_id){
        if (req.originalUrl !== '/login') {
            return res.redirect('/login');
        }
    }
    res.locals.user_id = req.session.user_id;
    res.locals.user_name = req.session.user_name;
    next();
}
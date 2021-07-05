const ceklogin = (req,res,next) => {
    if (req.session.idUser) {
        return next()
    } else {
        return res.redirect('/login');
    }
}

const cekUser = (req,res,next) =>{
    if (req.session.idUser) {
        return res.redirect('/');
    } else {
        return next()
    }
}

module.exports = {ceklogin,cekUser};
const User = require("../models/user")

const profile = function (req,res) {
    return res.render('user_profile',{
        title:"raman"
    })
}

const signUp = function (req,res) {
    return res.render('signup',{
        title:"Signin"
    })
}
const signIn = function (req,res) {
    return res.render('signin',{
        title:"Signup"
    })
}
const create = async function(req, res){
    if (req.body.password != req.body.confirm_password){
        
        return res.redirect('back');
    }

    let user = await User.findOne({email: req.body.email})
    
    .then((user)=>{console.log(user);}) 

        if (!user){
        let signUser= await User.create(req.body) 
        .then((signUser)=>{console.log(signUser);}) 
            
            return res.redirect('back');
        }

    }
const login = function (req,res) {
    //action pending
    return res.redirect('/');
}

const logout = function (req,res) {
    //action pending
    req.logout();
    return res.redirect('/');
}
module.exports = {profile,signUp,signIn,create,login,logout}
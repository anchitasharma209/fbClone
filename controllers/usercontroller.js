const User = require("../models/user")

const profile = function (req,res) {
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title:"HOME",
                    user:user
                })
            }
        })
    }

    
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
    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log(err); return}
        if(user){
            if(user.password != req.body.password){
                return res.redirect('back');
            }
            
            res.cookie('user_id',user.id)
            
            return res.redirect('/users/profile');
        } else{
            return res.redirect('/users/sign-in');
        }
    })
}

module.exports = {profile,signUp,signIn,create,login}
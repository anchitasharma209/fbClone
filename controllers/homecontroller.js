const Post = require("../models/post")

module.exports.home =  (req,res)=> {
    Post.find({}).populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })

    .exec(function (err,posts) {
        if(err){
            console.log(err);
            return
        } 
        return res.render('home',{
            title:"HOME",
            posts:posts
        })
    })
}
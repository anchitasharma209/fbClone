const home = function (req,res) {
    // res.cookie('user_id',25)
    return res.render('home',{
        title:"HOME"
    })
}

module.exports = {home}
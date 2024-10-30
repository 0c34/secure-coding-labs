const Comment = require('../models/commentModel');

exports.postComment = async(req, res) => {
    let {name, comment} = req.body
    
    try{
        await Comment.postComment({name, comment})
        
        res.send({message:"Comment posted successfully"});
    }catch (error) {
        console.error({message:"Error post comment"});
        throw error;
    }
}

exports.viewComment = async(req, res) => {
    const comments = await Comment.getComments()
    console.log(`comments: ${comments}`)
    res.render('view-comment.ejs',{comments})
}
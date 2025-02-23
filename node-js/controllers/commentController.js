const Comment = require('../models/commentModel');
var xssFilters = require('xss-filters');

exports.postComment = async(req, res) => {
    const {blog_id, comment} = req.body
    let name = ''
    if(req.session.user_id){
        name = req.session.user_name
    }
    else{
        name = 'Anonymous'
    }
    //name = xssFilters.inHTMLData(name)
    //comment = xssFilters.inHTMLData(comment)

    try{
        const newComment = await Comment.postComment({name, blog_id, comment})
        
        if (newComment) {
            res.json({ message: "Comment added successfully", comment: newComment });
        } else {
            res.status(500).json({ message: "Failed to insert comment" });
        }
    } catch (error) {
        console.error("Error posting comment:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

exports.viewComment = async(req, res) => {
    const comments = await Comment.getComments()
    console.log(`comments: ${comments}`)
    res.render('view-comment.ejs',{comments})
}

exports.deleteComment = async(req, res) => {
    const {commentId} = req.body
    try{
        await Comment.deleteComment({commentId})
        res.json({message: 'Comment deleted successfully!'})
    }catch(error){
        console.error('Error deleting comment:', error)
        res.status(500).send('Internal Server Error')
    }
}
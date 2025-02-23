const Blog = require('../models/blogModel');
const setupModel = require('../models/setupModel');

exports.index = async (req, res) => {
    const checkUserTable = await setupModel.checkTable('user_accounts');
    const checkCommentTable = await setupModel.checkTable('comments_table');
    const checkBlogTable = await setupModel.checkTable('blogs');
    if(!checkUserTable || !checkCommentTable || !checkBlogTable){
        res.redirect('/setup');
    }else{
        const [latest_blog] = await Blog.getLatestBlog();
        const blogs = await Blog.getBlogs();
        if(!latest_blog){
            console.log('Error fetching latest blog');
        }
        res.render('index', { blogs, latest_blog });
        }       
}
const Blog = require('../models/blogModel');

exports.index = async (req, res) => {
    const [latest_blog] = await Blog.getLatestBlog();
    console.log(latest_blog);
    const blogs = await Blog.getBlogs();
    res.render('index', { blogs, latest_blog });
}
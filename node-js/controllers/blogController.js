const blog = require('../models/blogModel');


exports.getBlogs = async (req, res) => {
    try {
        const blogs = await blog.getBlogs();
        res.render('blogs', { blogs});
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).send('Internal Server Error');
    }
}
exports.getLatestBlog = async (req, res) => {
    try {
        const [blog_data] = await blog.getLatestBlog();
        res.json(blog_data);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).send('Internal Server Error');
    }
}
exports.createBlog = async (req, res) => {
    const { title, content, author } = req.body;
    console.log(req.body)
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }
    const image_path = `/uploads/${req.file.filename}`;
    try {
        await blog.createBlog({ title, content, author, image_path});
        res.status(200).json({ message: 'Blog created successfully!' });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.getBlogsById = async (req, res) => {
    const { blog_id } = req.params;
    try {
        const [blog_data] = await blog.getBlogsById({ blog_id });
        console.log(blog_data)
        res.json(blog_data);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.deleteBlog = async (req, res) => {
    const { blog_id } = req.body;
    console.log(req.body)
    try {
        await blog.deleteBlog({ blog_id });
        res.json({ message: 'Blog deleted successfully!' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).send('Internal Server Error');
    }
}
const blog = require('../models/blogModel');
const {uploadFile, uploadFromURL} = require('../helper/uploadHelper');


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
    const user_id = req.session.user_id;
    const { title, content, author, imagePath } = req.body;
    console.log(req.body)
    try {
        await blog.createBlog({ title, content, author, user_id, imagePath});
        res.status(200).json({ message: 'Blog created successfully!' });
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.uploadImage = async (req, res) => {
    const { image_url, type } = req.body;
    if (type === 'url') {
        try {
            const imagePath = await uploadFromURL(image_url);
            res.json({ imagePath });
        } catch (error) {
            console.error('Error uploading image from URL:', error);
            res.status(400).json({ message: error.message });
        }
    }else{
    uploadFile(req, res, (error) => {
            if (error) {
                console.error('Error uploading image:', error);
                res.status(400).json({ message: error.message });
            } else {
                res.json({ message: 'Image uploaded successfully!', imagePath: `/uploads/${req.file.filename}` });
            }
        });
    }
}
    
exports.getBlogsById = async (req, res) => {
    const { blog_id } = req.params;
    try {
        const [blog_data] = await blog.getBlogsById({ blog_id });
        res.json(blog_data);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).send(`
            <h1>Internal Server Error</h1>
            <p>${error.message}</p>
            <pre>${error.stack}</pre>
        `);
    }
}

exports.getBlogByUserId = async (req, res) => {
    const user_id = req.session.user_id;
    console.log(user_id)
    try {
        const blogs = await blog.getBlogByUserId({ user_id });
        res.render('blogs', { blogs });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).send('Internal Server Error');
    }
}

exports.viewBlog = async (req, res) => {
    const { blog_id } = req.params;
    try {
        const [blog_data] = await blog.getBlogsById({ blog_id });
        res.render('view-blog', { blog_data });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).send(`
            <h1>Internal Server Error</h1>
            <p>${error.message}</p>
            <pre>${error.stack}</pre>
        `);
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
exports.updateBlog = async (req, res) => {   
    const {title, content, author, blogId} = req.body;
    try {
        await blog.updateBlog({ title, content, author, blogId });
        res.json({ message: 'Blog updated successfully!' });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).send('Internal Server Error');
    }
}
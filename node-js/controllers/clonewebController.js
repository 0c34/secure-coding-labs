const axios = require('axios');


exports.clonePage = (req, res) => {
  res.render('clone-web');
};


exports.clone = async (req, res) => {
    const { url } = req.body;
  
    try {
      const response = await axios.get(url);
      res.send(`
        <h1>Cloned Content from ${url}</h1>
        <div>${response.data}</div>
        <a href="/">Go back</a>
      `);
    } catch (error) {
      res.send(`
        <p>Failed to clone content. Error: ${error.message}</p>
        <a href="/">Go back</a>
      `);
    }
}
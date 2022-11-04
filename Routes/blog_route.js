const express = require('express')
const blogRouter = express.Router();
const blogController = require('../controllers/blog.controller')
// const { createBlog, PublishedBlogs, PublishedBlog } = require('../controllers/blog.controller')
// const authRouter = express.Router();
// const authController = require('../controllers/auth.controller');



//GET a listing of all Published Blogs
blogRouter.get('/', blogController.PublishedBlogs);

//GET a single Published Blog
blogRouter.get('/:id', blogController.PublishedBlog);

//POST a new Blog
blogRouter.post('/', blogController.createBlog);


module.exports = blogRouter;

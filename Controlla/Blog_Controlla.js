const Blog = require("../Models/blog_model");

const { readingTime } = require("../Utilities/Utility");

const createBlog = async (req, res, next) => {
  try {
    // Details from request
    const { title, description, tags, body } = req.body;

    // Blog object is created
    const newBlog = new Blog({
      title,
      description: description || title,
      tags,
      author: req.user._id,
      body,
      reading_time: readingTime(body),
    });

    // Obbject is saved to DATABASE
    const createdBlog = await newBlog.save();
    // return response
    return res.status(201).json({
      status: true,
      data: createdBlog,
    });
  } catch (e) {
    next(e);
  }
};

const published = async (req, res, next) => {
  try {
    const blogs = await Blog.find({ state: "published" })
      .select({ title: 1 })
      .populate("author", { username: 1 });

    return res.json({
      status: true,
      data: blogs,
    });
  } catch (err) {
    err.source = "Controller blogs required";
    next(err);
  }
};

const Blog = async (req, res, next) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id).populate("author", { username: 1 });

    if (blog.state !== "published") {
      return res.status(403).json({
        status: false,
        error: "Article is not published",
      });
    }

    // adding a count
    blog.read_count += 1;
    await blog.save();

    return res.json({
      status: true,
      data: blog,
    });
  } catch (err) {
    err.source = "Controller Blog not Published";
    next(err);
  }
};

module.exports = {
  createBlog,
  published,
  Blog,
};

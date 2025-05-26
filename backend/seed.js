const mongoose = require("mongoose");
const Category = require("./models/Category");
const Article = require("./models/Article");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    // Clear existing data
    await Category.deleteMany({});
    await Article.deleteMany({});

    // Create categories
    const categories = await Category.insertMany([
      { name: "World News", slug: "world-news" },
      { name: "Technology", slug: "technology" },
      { name: "Sports", slug: "sports" },
    ]);

    await User.deleteMany({});

    // Create users first
    const users = await User.insertMany([
      {
        name: "John Doe",
        email: "john@example.com",
        password: "hashedpassword",
        role: "author",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "hashedpassword",
        role: "author",
      },
    ]);

    // Use their ObjectIds in articles
    const articles = await Article.insertMany([
      {
        title: "Latest Tech Trends",
        slug: "latest-tech-trends",
        author: users[0]._id, // <-- here: ObjectId of John Doe
        content: "This is the full content of the article...",
        category: categories[1]._id,
      },
      {
        title: "World News Update",
        slug: "world-news-update",
        author: users[1]._id, // <-- ObjectId of Jane Smith
        content: "Content about world news...",
        category: categories[0]._id,
      },
    ]);

    console.log("Seed data added");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

const mongoose = require("mongoose");
const Category = require("./models/Category");
const Article = require("./models/Article");
const dotenv = require("dotenv");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected");

    // Clear existing data
    await Category.deleteMany({});
    await Article.deleteMany({});
    await User.deleteMany({});

    // Create categories
    const categories = await Category.insertMany([
      { name: "World News", slug: "world-news" },
      { name: "Technology", slug: "technology" },
      { name: "Sports", slug: "sports" },
      { name: "Business", slug: "business" },
      { name: "Health", slug: "health" },
      { name: "National", slug: "national" },
      { name: "Regional", slug: "regional" },
      { name: "Hyderabad", slug: "hyderabad" },
    ]);

    // Hash passwords before creating users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);

    // Create users
    const users = await User.insertMany([
      {
        name: "John Doe",
        email: "john@example.com",
        password: hashedPassword,
        role: "author",
        bio: "Technology reporter with 10 years of experience covering Silicon Valley"
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: hashedPassword,
        role: "author",
        bio: "Award-winning international correspondent"
      },
      {
        name: "Shaik Taher",
        email: "shaik@example.com",
        password: hashedPassword,
        role: "admin",
        bio: "Editor-in-Chief and founder of TRN News"
      },
      {
        name: "Rajesh Kumar",
        email: "rajesh@example.com",
        password: hashedPassword,
        role: "author",
        bio: "Sports journalist specializing in cricket and football"
      }
    ]);

    // Create articles with realistic data
    const articles = await Article.insertMany([
      {
        title: "Global Leaders Meet for Climate Summit in Dubai",
        slug: "climate-summit-dubai-2025",
        author: users[1]._id, // Jane Smith
        content: `World leaders gathered in Dubai for the 2025 Climate Summit to address pressing environmental concerns. The conference focused on... [detailed content about agreements, protests, and outcomes]`,
        category: categories[0]._id, // World News
        image: "/uploads/climate-summit.jpg",
        views: 1250,
        featured: true,
        createdAt: new Date("2025-05-28")
      },
      {
        title: "Hyderabad's Tech Startups Raise Record Funding",
        slug: "hyderabad-tech-funding-2025",
        author: users[0]._id, // John Doe
        content: `Hyderabad's startup ecosystem has seen unprecedented growth this quarter, with local tech companies raising over $500 million... [analysis of key startups and investors]`,
        category: categories[7]._id, // Hyderabad
        image: "/uploads/hyderabad-tech.jpg",
        views: 980,
        createdAt: new Date("2025-05-27")
      },
      {
        title: "New AI Model Can Predict Health Risks with 95% Accuracy",
        slug: "ai-health-predictions-2025",
        author: users[0]._id, // John Doe
        content: `Researchers at IIIT Hyderabad have developed an AI system that analyzes medical history and lifestyle factors to... [technical details and expert reactions]`,
        category: categories[1]._id, // Technology
        image: "/uploads/ai-health.jpg",
        views: 2100,
        featured: true,
        createdAt: new Date("2025-05-26")
      },
      {
        title: "India Wins Test Series Against England",
        slug: "india-england-test-series-2025",
        author: users[3]._id, // Rajesh Kumar
        content: `In a thrilling finale at Hyderabad's Uppal Stadium, the Indian cricket team secured a 3-2 victory... [match highlights and player performances]`,
        category: categories[2]._id, // Sports
        image: "/uploads/cricket-match.jpg",
        views: 3200,
        createdAt: new Date("2025-05-25")
      },
      {
        title: "Telangana Government Announces New IT Policy",
        slug: "telangana-it-policy-2025",
        author: users[2]._id, // Shaik Taher
        content: `The state government unveiled ambitious plans to make Hyderabad a global AI hub by 2030, including... [policy details and industry reactions]`,
        category: categories[5]._id, // National
        image: "https://fastly.picsum.photos/id/732/200/300.jpg?hmac=mBueuWVJ8LlL-R7Yt9w1ONAFVayQPH5DzVSO-lPyI9w",
        views: 870,
        createdAt: new Date("2025-05-24")
      },
      {
        title: "Study Reveals Benefits of Local Hyderabad Cuisine",
        slug: "hyderabad-cuisine-health-benefits",
        author: users[1]._id, // Jane Smith
        content: `New research from NIN shows traditional Hyderabadi dishes like Haleem and Biryani contain... [nutritional analysis and chef interviews]`,
        category: categories[4]._id, // Health
        image: "/uploads/hyderabadi-food.jpg",
        views: 1450,
        createdAt: new Date("2025-05-23")
      }
    ]);

    console.log("Seed data successfully added:");
    console.log(`- ${categories.length} categories created`);
    console.log(`- ${users.length} users created`);
    console.log(`- ${articles.length} articles created`);
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1);
  });
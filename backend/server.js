// Dependencies
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors"); // Enable CORS for all routes
const recipesRouter = require("./routes/recipes");
const ingredientsRouter = require("./routes/ingredients");
const missingIngredientsRouter = require("./routes/missingIngredients");
const favoritesRouter = require("./routes/favorites");
const { port } = require("./config");

const app = express();

// Security middleware
app.use(helmet());

// Rate limit, max 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3001", // Allows frontend to connect
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  }),
);

app.use(express.json());

// Routes
app.use("/recipes", recipesRouter);
app.use("/ingredients/price", require("./routes/price"));
app.use("/ingredients", ingredientsRouter); // Deprecated -- please use /missing-ingredients instead
app.use("/missing-ingredients", missingIngredientsRouter);
app.use("/favorites", favoritesRouter);

// Start the server
app.listen(port, (err) => {
  if (!err) {
    console.log(`Server is running on port ${port}`);
  } else {
    console.error(err);
    process.exit(1); // Failure
  }
});

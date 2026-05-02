require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { x402 } = require("@x402/express");
const { ExactStellarScheme } = require("@x402/stellar");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Stellar x402 Scheme
// TODO: [Wave Issue] Add proper network configuration and environment variables
const stellarScheme = new ExactStellarScheme({
  destination: process.env.STELLAR_DESTINATION || "GDFW...MOON",
  network: process.env.STELLAR_NETWORK || "TESTNET",
});

/**
 * Demo Route
 * Protected by @x402/express middleware.
 * Automatically throws 402 Payment Required and validates incoming transactions.
 */
app.get(
  "/api/demo",
  x402({
    scheme: stellarScheme,
    price: "1.00", // e.g. 1 USDC
  }),
  (req, res) => {
    // If we reach here, the x402 middleware verified the payment successfully!
    res.json({
      message: "Welcome to the MOON! Payment successful.",
      secret: "The moon is made of cheese and blockchain.",
      timestamp: new Date().toISOString(),
      status: "Success",
    });
  }
);

// Basic health check
app.get("/", (req, res) => res.send("MOON Express Backend is running."));

app.listen(PORT, () => {
  console.log(`🌕 MOON Backend listening on http://localhost:${PORT}`);
});

import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.js";
import Product from "./models/Product.js";
import { products } from "../src/data/products.js";

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/floor_first";
    await mongoose.connect(mongoUri);
    console.log(`[Seed] Connected to MongoDB at ${mongoUri}`);

    // Seed Demo User
    const demoEmail = process.env.DEMO_USER_EMAIL || "demo@floorfirst.ae";
    const demoPassword = process.env.DEMO_USER_PASSWORD || "password123";
    const existingDemo = await User.findOne({ email: demoEmail });
    if (!existingDemo) {
      await User.create({
        email: demoEmail,
        password: demoPassword,
        fullName: "Demo User",
        phone: "+971 50 123 4567",
        username: "demouser",
      });
      console.log(`[Seed] Demo user created: ${demoEmail}`);
    } else {
      console.log("[Seed] Demo user already exists.");
    }

    // Seed Products
    if (products && products.length > 0) {
      const existingProductCount = await Product.countDocuments();
      if (existingProductCount === 0) {
        const productDocs = products.map((p) => ({
          id: p.id,
          name: p.name,
          category: p.category,
          subCategory: p.subCategory || "",
          pricePerSqft: p.pricePerSqft,
          rating: p.rating || 4.8,
          reviews: p.reviews || 0,
          image: p.image || "",
          description: p.description || "",
          features: p.features || [],
          specs: p.specs || {},
          inStock: p.inStock ?? true,
        }));
        await Product.insertMany(productDocs);
        console.log(`[Seed] Successfully seeded ${productDocs.length} products into MongoDB!`);
      } else {
        console.log(`[Seed] Products already seeded (${existingProductCount} products found).`);
      }
    }

    console.log("[Seed] Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("[Seed] Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();

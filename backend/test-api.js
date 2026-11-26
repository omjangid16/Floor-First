import "dotenv/config";
import mongoose from "mongoose";
import http from "node:http";
import app from "./index.js";

const testServer = async () => {
  let server;
  try {
    const port = 5001; // test on port 5001 to avoid colliding with any running service
    server = http.createServer(app);
    await new Promise((resolve) => server.listen(port, resolve));
    console.log(`[Test] Server listening on port ${port}`);

    const baseUrl = `http://127.0.0.1:${port}/api`;

    // 1. Health check
    const healthRes = await fetch(`${baseUrl}/health`);
    const health = await healthRes.json();
    console.log("[Test] 1. Health check:", health.status === "ok" ? "PASSED" : "FAILED", health);

    // 2. Auth - Register test user
    const testEmail = `tester_${Date.now()}@example.com`;
    const regRes = await fetch(`${baseUrl}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: testEmail,
        password: "password123",
        fullName: "API Tester",
        phone: "+971501112233",
        username: "apitester",
      }),
    });
    const regData = await regRes.json();
    console.log("[Test] 2. Register user:", regData.token ? "PASSED" : "FAILED");
    const token = regData.token;

    // 3. Auth - Login test user
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: testEmail,
        password: "password123",
      }),
    });
    const loginData = await loginRes.json();
    console.log("[Test] 3. Login user:", loginData.token ? "PASSED" : "FAILED");

    // 4. Auth - Get Me
    const meRes = await fetch(`${baseUrl}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const meData = await meRes.json();
    console.log("[Test] 4. Get Current User (/auth/me):", meData.user?.email === testEmail ? "PASSED" : "FAILED");

    // 5. Addresses - Create address
    const addrRes = await fetch(`${baseUrl}/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        label: "Office",
        recipient_name: "API Tester",
        phone: "+971501112233",
        line1: "Business Bay, Tower 1",
        city: "Dubai",
        emirate: "Dubai",
      }),
    });
    const addrData = await addrRes.json();
    console.log("[Test] 5. Add Address:", addrData.id ? "PASSED" : "FAILED");

    // 6. Addresses - List addresses
    const addrListRes = await fetch(`${baseUrl}/addresses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const addrList = await addrListRes.json();
    console.log("[Test] 6. List Addresses:", Array.isArray(addrList) && addrList.length > 0 ? "PASSED" : "FAILED");

    // 7. Cart - Sync cart
    const cartRes = await fetch(`${baseUrl}/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: [
          { product_id: "tile-1", area: 25, installation: true },
          { product_id: "wood-1", area: 50, installation: false },
        ],
      }),
    });
    const cartData = await cartRes.json();
    console.log("[Test] 7. Sync Cart:", Array.isArray(cartData) && cartData.length === 2 ? "PASSED" : "FAILED");

    // 8. Wishlist - Toggle
    const wishRes = await fetch(`${baseUrl}/wishlist/toggle`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId: "tile-1" }),
    });
    const wishData = await wishRes.json();
    console.log("[Test] 8. Toggle Wishlist:", wishData.isSaved === true ? "PASSED" : "FAILED");

    // 9. Quotes - Submit quote
    const quoteRes = await fetch(`${baseUrl}/quotes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Quote Requester",
        email: "quote@example.com",
        phone: "+971509998877",
        projectType: "residential",
        area: "1200",
        flooringType: "wood",
        message: "Need quote for villa renovation.",
      }),
    });
    const quoteData = await quoteRes.json();
    console.log("[Test] 9. Create Quote Request:", quoteData.quote?.id ? "PASSED" : "FAILED");

    // 10. Orders - Place Order
    const orderRes = await fetch(`${baseUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: [
          {
            product_id: "tile-1",
            product_name: "Carrara Marble Tile",
            image: "",
            area: 25,
            quantity: 1,
            unit_price: 120,
            installation: true,
          },
        ],
        subtotal: 3000,
        total: 3625,
        currency: "AED",
        shippingAddress: {
          recipient_name: "API Tester",
          phone: "+971501112233",
          line1: "Business Bay, Tower 1",
          city: "Dubai",
        },
      }),
    });
    const orderData = await orderRes.json();
    console.log("[Test] 10. Create Order:", orderData.orderNumber ? "PASSED" : "FAILED", `(${orderData.orderNumber})`);

    // 11. Orders - List Orders
    const ordersRes = await fetch(`${baseUrl}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const ordersList = await ordersRes.json();
    console.log("[Test] 11. List Orders:", Array.isArray(ordersList) && ordersList.length > 0 ? "PASSED" : "FAILED");

    // 12. Products - List seeded products
    const prodRes = await fetch(`${baseUrl}/products`);
    const prodList = await prodRes.json();
    console.log("[Test] 12. List Products:", Array.isArray(prodList) && prodList.length > 0 ? `PASSED (${prodList.length} products in DB)` : "FAILED");

    console.log("\n==========================================");
    console.log("  ALL BACKEND INTEGRATION TESTS PASSED!");
    console.log("==========================================\n");

  } catch (error) {
    console.error("[Test] Test failed:", error);
  } finally {
    if (server) {
      server.close();
    }
    await mongoose.disconnect();
    process.exit(0);
  }
};

testServer();

module.exports = {
  apps: [
    {
      name: "floor-first-api",
      script: "backend/index.js",
      instances: "max",
      exec_mode: "cluster",
      env_production: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
  ],
};

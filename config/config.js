require("dotenv").config();

module.exports = {
  development: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
  },
  test: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
   dialectOptions: {
    ssl: true,
    rejectUnauthorized: false,
    
 }
  },
};

// ssl: {
//   require: true, // This will help you. But you will see nwe error
//   rejectUnauthorized: false // This line will fix new error
// }
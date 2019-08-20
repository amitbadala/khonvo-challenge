module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_CONNECTION_STRING:
    process.env.MONGODB_CONN ||
    "mongodb+srv://admin:FRsojwU0AjxQyWhS@scryptonian-ghufh.mongodb.net/test?retryWrites=true&w=majority"
};
//   "mongodb://localhost:27017/cms"

const databaseConfig = {
    development: {
        url: "mongodb://localhost:27017/reelo-assignment",
        options: {},
    },
    production: {
        url: process.env.MONGODB_URI,
        options: {},
    },
};

export default databaseConfig;
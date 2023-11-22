const databaseConfig = {
    development: {
        url: "mongodb://127.0.0.1/reelo-assignment",
        options: {},
    },
    production: {
        url: process.env.MONGODB_URI,
        options: {},
    },
};

export default databaseConfig;
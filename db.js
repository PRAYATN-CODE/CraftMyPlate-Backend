const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://prayatnsoni-aichatconnect:BIw8Sf6zAFrScpHN@prayatn-ai-chatconnect.rusvl.mongodb.net/craftmyplate-project"

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURL, {
            serverSelectionTimeoutMS: 60000,
            socketTimeoutMS: 45000,
            autoIndex: false,
        });
        console.log("Connected to MongoDB successfully");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = connectToMongo;


const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://umeshchandrareddy851:ma8smb0LHPc1GyH7@cluster0.m9llaqa.mongodb.net/devtinder"
    );
};
module.exports = connectDB;


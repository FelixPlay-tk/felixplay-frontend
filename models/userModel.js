import mongoose from "mongoose";
const crypto = require("crypto");
const validator = require("validator");

const userSchema = mongoose.Schema(
    {
        firstname: {
            type: String,
            required: "{PATH} is required!",
            trim: true,
            validate(value) {
                if (!validator.isLength(value, [{ min: 2, max: 15 }])) {
                    throw new Error("minimum 2 characters required");
                }
                if (!validator.isAlpha(value)) {
                    throw new Error("only alphabets allowed");
                }
            },
        },

        lastname: {
            type: String,
            required: "{PATH} is required!",
            trim: true,
            validate(value) {
                if (!validator.isLength(value, [{ min: 2, max: 15 }])) {
                    throw new Error("minimum 2 characters required");
                }
                if (!validator.isAlpha(value)) {
                    throw new Error("only alphabets allowed");
                }
            },
        },

        email: {
            type: String,
            required: "{PATH} is required!",
            index: true,
            trim: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid email address");
                }
            },
        },

        hashed_password: String,

        OTP: String,

        verified: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

// make password hash
userSchema.methods.hashPassword = function (password) {
    this.hashed_password = crypto
        .pbkdf2Sync(password, process.env.HASH_SALT, 1000, 64, `sha512`)
        .toString(`hex`);
};

// verify password hash
userSchema.methods.verifyPassword = function (password) {
    let enteredPasswordHash = crypto
        .pbkdf2Sync(password, process.env.HASH_SALT, 1000, 64, `sha512`)
        .toString(`hex`);
    return this.hashed_password === enteredPasswordHash;
};

// generate verification token
userSchema.methods.generateOTP = function () {
    const digits = "0123456789";
    let OTP = "";
    for (let i = 0; i < 4; i++) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    this.OTP = OTP;
};

export default mongoose.models.user || mongoose.model("user", userSchema);

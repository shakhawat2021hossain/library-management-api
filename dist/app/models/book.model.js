"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
    },
    author: {
        type: String,
        required: [true, "Author name is required"],
    },
    genre: {
        type: String,
        required: [true, "Genre is required"],
        enum: [
            "FICTION",
            "NON_FICTION",
            "SCIENCE",
            "HISTORY",
            "BIOGRAPHY",
            "FANTASY",
        ],
    },
    isbn: {
        type: String,
        required: [true, "isnb number is required"],
        unique: [true, "ISBN must be unique"],
    },
    description: {
        type: String,
    },
    copies: {
        type: Number,
        required: [true, "Total copies of book is required"],
        min: [0, "Copies must be a non-negative number"],
        validate: {
            validator: Number.isInteger,
            message: "Copies must be an integer",
        },
    },
    available: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
bookSchema.method("updateAvailable", function () {
    if (this.copies === 0) {
        this.available = false;
    }
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);

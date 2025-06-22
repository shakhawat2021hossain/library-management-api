import { Model, model, Schema } from "mongoose";
import { BookMethods, IBook } from "../interfaces/book.interface";

const bookSchema = new Schema<IBook, Model<IBook>, BookMethods>(
    {
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
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

bookSchema.method("updateAvailable", function () {
    if (this.copies === 0) {
        this.available = false;
    }
});

export const Book = model("Book", bookSchema);
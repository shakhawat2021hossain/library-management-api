import mongoose, { model } from "mongoose";
import { IBook } from "../interfaces/book.interfaces";

const bookSchema = new mongoose.Schema<IBook>({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true,
        enum: ['FICTION', 'NON_FICTION', 'SCIENCE', 'HISTORY', 'BIOGRAPHY', 'FANTASY']
    },
    isbn: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    copies: {
        type: Number,
        required: true,
        min: [0, 'Copies cannot be negative'],
    },
    available: {
        type: Boolean,
        default: true,
    }
})

export const Book =  model("Book", bookSchema)
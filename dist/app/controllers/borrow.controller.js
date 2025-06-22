"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
exports.borrowRouter = express_1.default.Router();
exports.borrowRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { book, quantity, dueDate } = req.body;
        const findedBook = yield book_model_1.Book.findById(book);
        if (findedBook) {
            if (findedBook.copies >= quantity) {
                findedBook.copies -= quantity;
                findedBook.updateAvailable();
                yield findedBook.save();
                const borrowed = yield borrow_model_1.Borrow.create({
                    book,
                    quantity,
                    dueDate,
                });
                console.log(borrowed);
                res.status(201).json({
                    success: true,
                    message: "Book borrowed successfully",
                    data: borrowed,
                });
            }
            else {
                res.status(400).json({
                    success: false,
                    message: "No copies of book available to borrow",
                    data: null,
                });
            }
        }
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "Failled borrowing book",
            error: error,
        });
    }
}));
exports.borrowRouter.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_model_1.Borrow.aggregate([
            {
                $group: {
                    _id: "$book",
                    totalQuantity: { $sum: "$quantity" },
                },
            },
            {
                $lookup: {
                    from: "books",
                    localField: "_id",
                    foreignField: "_id",
                    as: "bookDetails",
                },
            },
            {
                $unwind: "$bookDetails",
            },
            {
                $project: {
                    _id: 0,
                    book: {
                        title: "$bookDetails.title",
                        isbn: "$bookDetails.isbn",
                    },
                    totalQuantity: 1,
                },
            },
        ]);
        res.status(200).json({
            success: true,
            message: "Borrowed books summary retrieved successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
            error: error,
        });
    }
}));

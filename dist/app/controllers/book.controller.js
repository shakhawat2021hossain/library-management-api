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
exports.bookRouter = void 0;
const express_1 = __importDefault(require("express"));
const book_model_1 = require("../models/book.model");
exports.bookRouter = express_1.default.Router();
exports.bookRouter.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = new book_model_1.Book(req.body);
        yield book.save();
        res.status(201).json({ success: true, message: 'Book created successfully', data: book });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Validation failed', error });
    }
}));
exports.bookRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
        // console.log(req.query);
        const query = filter ? { genre: filter } : {};
        const books = yield book_model_1.Book.find(query).sort({ [sortBy]: sort === 'asc' ? 1 : -1 }).limit(Number(limit));
        // console.log(books);
        res.json({ success: true, message: 'Books retrieved successfully', data: books });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve books', error });
    }
}));
exports.bookRouter.get('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findById(req.params.bookId);
        res.json({ success: true, message: 'Book retrieved successfully', data: book });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Book not Found', error });
    }
}));
exports.bookRouter.put('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield book_model_1.Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
        // console.log(book);
        res.json({ success: true, message: 'Book updated successfully', data: book });
    }
    catch (error) {
        res.status(400).json({ success: false, message: 'Update failed', error });
    }
}));
exports.bookRouter.delete('/:bookId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield book_model_1.Book.findByIdAndDelete(req.params.bookId);
        res.json({ success: true, message: 'Book deleted successfully', data: null });
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'Deletion failed', error });
    }
}));

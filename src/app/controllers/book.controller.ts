import express, { Request, Response } from "express"
import { Book } from "../models/book.model";
export const bookRouter = express.Router()

bookRouter.post('/books', async (req: Request, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ success: true, message: 'Book created successfully', data: book });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Validation failed', error });
    }
})

bookRouter.get('/books', async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
        const query: any = filter ? { genre: filter } : {};
        const books = await Book.find(query).sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 }).limit(Number(limit));
        res.json({ success: true, message: 'Books retrieved successfully', data: books });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve books', error });
    }
})

bookRouter.get('/books/:bookId', async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book){
            res.status(404).json({
                success: false,
                message: "Book not found",
                data: null
            })
            return
        }
        res.json({ success: true, message: 'Book retrieved successfully', data: book });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Internal Server Error', error });
    }
})
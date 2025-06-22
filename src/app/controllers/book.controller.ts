import express, { Request, Response } from "express"
import { Book } from "../models/book.model";
import { error } from "console";
export const bookRouter = express.Router()

bookRouter.post('/', async (req: Request, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json({ success: true, message: 'Book created successfully', data: book });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Validation failed', error });
    }
})

bookRouter.get('/', async (req: Request, res: Response) => {
    try {
        const { filter, sortBy = 'createdAt', sort = 'asc', limit = '10' } = req.query;
        // console.log(req.query);

        const query: any = filter ? { genre: filter } : {};

        const books = await Book.find(query).sort({ [sortBy as string]: sort === 'asc' ? 1 : -1 }).limit(Number(limit));
        // console.log(books);
        res.json({ success: true, message: 'Books retrieved successfully', data: books });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve books', error });
    }
})

bookRouter.get('/:bookId', async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.bookId);
        
        res.json({ success: true, message: 'Book retrieved successfully', data: book });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Book not Found', error });
    }
})

bookRouter.put('/:bookId', async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.bookId, req.body, { new: true, runValidators: true });
        // console.log(book);
        

        res.json({ success: true, message: 'Book updated successfully', data: book });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Update failed', error });
    }
})

bookRouter.delete('/:bookId', async (req: Request, res: Response) => {
    try {
        await Book.findByIdAndDelete(req.params.bookId);
        res.json({ success: true, message: 'Book deleted successfully', data: null });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Deletion failed', error });
    }
})
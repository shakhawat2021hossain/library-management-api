import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { bookRouter } from './app/controllers/book.controller';
import { borrowRouter } from './app/controllers/borrow.controller';

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());


// routes
app.get('/', (req: Request, res: Response) => {
    res.json({
        success: true,
        message: "Welcome to the Library Management API"
    });
});

app.use('/api/books', bookRouter)
app.use("/api/borrow", borrowRouter)

// global err handler, handle not found route
export default app;
import express, { Application, Request, Response } from 'express';
import cors from 'cors';

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

// global err handler, handle not found route
export default app;
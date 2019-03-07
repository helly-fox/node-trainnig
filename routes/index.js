import express from 'express';
import userRouter from './users';
import productRouter from './products';
const router = express.Router();

router
    .use('/api/users', userRouter)
    .use('/api/products', productRouter);

export default router;
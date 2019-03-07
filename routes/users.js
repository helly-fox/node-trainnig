import express from 'express';
const router = express.Router();

const users = [{id: 1, name: 'Test', email: 'test.test.com'}];

router.get('/', (req, res, next) => res.send(users));

export default router;
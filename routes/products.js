import express from 'express';
const router = express.Router();

const products = [{id: 1, name: 'Test product', price: 10, reviews: ['Aweresome!', 'Good!']}];
const findProductById = id => products.find(p => p.id.toString() === id);

router.get('/', (req, res) => res.send(products));

router.post('/', (req, res) => {
    console.log(req.body);
});

router.get('/:id/reviews', (req, res, next) => {
    const prod = findProductById(req.params.id);
    if (!prod) {
        next({
            code: 404,
            message: 'No such content',
        })
    }

    res.send(prod.reviews)
});

router.get('/:id', (req, res, next) => {
    const prod = findProductById(req.params.id);
    console.log(req.params);
    if (!prod) {
        next({
            code: 404,
            message: 'No such content',
        })
    }

    res.send(prod);
});

export default router;
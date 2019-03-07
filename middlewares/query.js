const queryParser = (req, res, next) => {
    req.parsedQuery = req.query;
    next();
};

export default queryParser;
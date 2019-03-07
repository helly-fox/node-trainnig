const cookieParserMW = (req, res, next) => {
    req.parsedCookies = req.cookies;
    next();
};

export default cookieParserMW;
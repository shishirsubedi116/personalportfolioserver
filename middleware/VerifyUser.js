const secretKey = process.env.CODE

const verifyUser = async (req, res, next) => {

    const CODE = req.header('CODE');
    if (CODE != secretKey) {
        res.status(401).send({ success: false, message: "You Are Not Allowed" })
    }
    else {
        return next()
    }
}
module.exports = verifyUser
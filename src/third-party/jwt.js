const jwt = require("jsonwebtoken");

const TOKEN_SECRET_KEY = process.env.JWT_TOKEN_SECRET_KEY;
const TOKEN_EXPIRY = process.env.JWT_TOKEN_EXPIRY;

exports.generateToken = function (user) {
    const payload = {
        id: user.uuid,
        email: user.email,
    };

    if (user.first_name) payload.first_name = user.first_name;
    if (user.last_name) payload.last_name = user.last_name;
    if (user.cell_no) payload.cell_no = user.cell_no;
    if (user.role) payload.role = user.role;
    if (user.status) payload.status = user.status;

    return jwt.sign(payload, TOKEN_SECRET_KEY, {expiresIn: TOKEN_EXPIRY});
};

exports.verifyToken = async (req, res, next) => {
    try {
        let bearerToken = req.headers.authorization;

        if (!bearerToken) {
            return res.status(401).json({error: "No Authentication Token Provided"});
        }

        // added by Sunil
        const parts = bearerToken.split(" ");

        if (parts[0] !== "Bearer") {
            return res.status(401).json({error: "Token type must be of type \"Bearer\""});
        }
        bearerToken = parts[1];

        req.user = jwt.verify(bearerToken, TOKEN_SECRET_KEY);
        return next();
    } catch (err) {
        return res.status(401).json({error: "Token is Invalid or Expired"});
    }
};

exports.verifyRole = (role) => [
    this.verifyToken,
    (req, res, next) => {
        let {role: user_role} = req.user;

        if (user_role && (user_role === role)) {
            next();
        } else
            return res.status(403).json({error: "Access Denied"});
    }
];

exports.verifyStatus = (status) => [
    this.verifyToken,
    (req, res, next) => {
        let {status: user_status} = req.user;

        console.log("USER", req.user)
        if (user_status === status) {
            next();
        } else
            return res.status(403).json({error: "Access Denied"});
    }
];
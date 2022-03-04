const bcrypt = require("bcrypt");

const saltRounds = process.env.BCRYPT_SALT_ROUNDS || 10;

module.exports.hashPassword = async (value) => bcrypt.hash(value, saltRounds);
module.exports.comparePassword = async (value, hash) => bcrypt.compare(value, hash)
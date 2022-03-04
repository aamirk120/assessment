const {generateToken} = require(`${__thirdParty}/jwt`);
const {hashPassword, comparePassword} = require(`${__thirdParty}/bcrypt`);
const {User} = require(`${__models}`);

exports.register = async (req, res) => {
    try {
        const {
            first_name,
            last_name,
            email,
            password
        } = req.body;

        const exists = await User.findOne({where: {email}});
        console.log(
            exists
        )

        if (exists) {
            return res.status(409).json({message: "User already exists"});
        }

        let user = {
            first_name,
            last_name,
            email
        };
        user.password = await hashPassword(password);

        user = User.build(user);
        await user.save();

        res.status(201).json({});
    } catch (e) {
        console.error(e)
        res.status(500).json({msg: e.message});
    }
};

exports.login = async (req, res) => {
    const {
        email,
        password
    } = req.body;

    const user = await User.findOne({where: {email}});
    if (!user) {
        return res.status(401).json({message: "Credentials are not valid"});
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(401).json({message: "Credentials are not valid"});
    }

    let token = await generateToken(user);
    res.status(200).json({token});
};

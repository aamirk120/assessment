const {User} = require(`${__models}`);

exports.approveUser = async (req, res) => {
    try {
        const {id: user_id} = req.query;
        let user = await User.findByPk(user_id);

        if (!user) {
            return res.status(404).json({});
        }

        user.status = "active";
        await user.save();

        res.status(204).json({});
    } catch (e) {
        console.error(e)
        res.status(500).json({msg: e.message});
    }
};

exports.getUsers = async (req, res) => {
    try {
        const {id: user_id} = req.query;

        let where_clause = {};
        if (user_id)
            where_clause = {where: {uuid: user_id}};

        const users = await User.findAll(where_clause);
        if (!users.length)
            return res.status(404).json([]);

        res.status(200).json(users);
    } catch (e) {
        console.error(e)
        res.status(500).json({msg: e.message});
    }
};

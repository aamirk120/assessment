const {Customer} = require(`${__models}`);

exports.getCustomers = async (req, res) => {
    try {
        const {id: user_id} = req.user;

        let where_clause = {};
        if (user_id)
            where_clause = {where: {user_id: user_id}};

        const users = await Customer.findAll(where_clause);
        if (!users.length)
            return res.status(404).json([]);

        res.status(200).json(users);
    } catch (e) {
        console.error(e)
        res.status(500).json({msg: e.message});
    }
};

exports.addCustomer = async (req, res) => {
    try {
        const {first_name, last_name, email} = req.body;
        const {id: user_id} = req.user;

        const exists = await Customer.findOne({where: {email}});

        if (exists) {
            return res.status(409).json({message: "Customer already exists"});
        }

        let customer = Customer.build({
            first_name,
            last_name,
            email
        });
        customer.user_id = user_id;
        await customer.save();

        res.status(201).json({});
    } catch (e) {
        console.error(e)
        res.status(500).json({msg: e.message});
    }
};


exports.deleteCustomer = async (req, res) => {
    const {id: customer_id} = req.query;

    await Customer.destroy({
        where: {
            uuid: customer_id
        }
    })

    res.status(204).json({});

};
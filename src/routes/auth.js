const Controller = require(`${__controllers}/auth`);

module.exports = (router) => {

    router.post("/auth/register", Controller.register);
    router.post("/auth/login", Controller.login);
};


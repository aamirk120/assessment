const Controller = require(`${__controllers}/admin`);
const {verifyRole, verifyToken} = require(`${__thirdParty}/jwt`);

module.exports = (router) => {
    router.patch("/admin/users/approve", verifyRole("admin"), Controller.approveUser);
    router.get("/admin/users", verifyToken, Controller.getUsers);
};

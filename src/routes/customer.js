const Controller = require(`${__controllers}/customer`);
const {verifyStatus} = require(`${__thirdParty}/jwt`);

module.exports = (router) => {
    router.post("/customers", verifyStatus("active"), Controller.addCustomer);
    router.get("/customers", verifyStatus("active"), Controller.getCustomers);
    router.delete("/customers", verifyStatus("active"), Controller.deleteCustomer);
};


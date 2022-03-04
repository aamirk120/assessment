const moduleName = "[default]";
const path = require("path");
module.exports = (router) => {
  const obj = {};

  // DEFAULT_ROUTES
  obj.operationNotAllowed = (res, type) => {
    console.error("[operationNotAllowed]", type);
    return res.status(404).send();
  };

  // router.get("/", function (req, res) {
  //   res.send({title: "Welcome"});
  // });

  // this must be the last line
  router.route("/*")
    .get(function (req, res) {
      obj.operationNotAllowed(res, "GET");
    })
    .post(function (req, res) {
      obj.operationNotAllowed(res, "POST");
    })
    .delete(function (req, res) {
      obj.operationNotAllowed(res, "DELETE");
    })
    .put(function (req, res) {
      obj.operationNotAllowed(res, "PUT");
    });
};

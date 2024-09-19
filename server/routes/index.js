const router = require("express").Router();

router.use("/deposit-request", require("./deposit-request"));
router.use("/login", require("./login"));
router.use("/invoices", require("./invoices"));

module.exports = router;

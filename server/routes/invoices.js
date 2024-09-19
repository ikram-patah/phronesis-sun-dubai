const router = require("express").Router();
const rebillySDK = require("../lib/rebilly-api");

const { REBILLY_ORGANIZATION_ID, REBILLY_WEBSITE_ID } = require("../config/config");

router.get("/", async (req, res, next) => {
  console.log(req.headers.authorization);
  rebillySDK.setSessionToken(req.headers.authorization);

  const {items: invoices} = await rebillySDK.invoices.getAll({
    // limit: 10,
    sort: '-createdTime',
    filter: 'customerId:cus_01J4F5YR4MN9C3M34FVK9AMET4'
  });

  res.send(invoices.map(({fields}) => fields));
});

module.exports = router;
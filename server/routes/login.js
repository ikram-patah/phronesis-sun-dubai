const router = require("express").Router();
const rebillySDK = require("../lib/rebilly-api");

const { REBILLY_ORGANIZATION_ID, REBILLY_WEBSITE_ID } = require("../config/config");

router.post("/", async (req, res, next) => {
  const response = {};
  const customerId = "cus_01J69SYRK6AYWPYMS6MS9MJNNK";
  const data = {
    mode: "passwordless",
    customerId,
  };

  const { fields: login } = await rebillySDK.customerAuthentication.login({
    data,
  });

  const { fields: exchangeToken } = await rebillySDK.customerAuthentication.exchangeToken({
    token: login.token,
    data: {
      acl: [
        {
          scope: {
            organizationId: [REBILLY_ORGANIZATION_ID],
          },
          permissions: [
            '*'
          ],
        },
      ],
      customClaims: {
        websiteId: REBILLY_WEBSITE_ID,
      },
    },
  });

  response.token = exchangeToken.token;

  res.send(response);
});

module.exports = router;
const router = require("express").Router();
const rebillySDK = require("../lib/rebilly-api");

const { REBILLY_ORGANIZATION_ID, REBILLY_WEBSITE_ID } = require("../config/config");

router.post("/", async (req, res, next) => {
  const response = {};
  const customerId = "cus_01J69SYRK6AYWPYMS6MS9MJNNK"; // Customer: Test Tornike
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
            "PostToken",
            "PostDigitalWalletValidation",
            "StorefrontGetAccount",
            "StorefrontPatchAccount",
            "StorefrontPostPayment",
            "StorefrontGetTransactionCollection",
            "StorefrontGetTransaction",
            "StorefrontGetPaymentInstrumentCollection",
            "StorefrontPostPaymentInstrument",
            "StorefrontGetPaymentInstrument",
            "StorefrontPatchPaymentInstrument",
            "StorefrontPostPaymentInstrumentDeactivation",
            "StorefrontGetWebsite",
            "StorefrontGetInvoiceCollection",
            "StorefrontGetInvoice",
            "StorefrontGetProductCollection",
            "StorefrontGetProduct",
            "StorefrontPostReadyToPay",
            "StorefrontGetPaymentInstrumentSetup",
            "StorefrontPostPaymentInstrumentSetup",
            "StorefrontGetDepositRequest",
            "StorefrontGetDepositStrategy",
            "StorefrontPostDeposit",
          ],
        },
      ],
      customClaims: {
        websiteId: REBILLY_WEBSITE_ID,
      },
    },
  });

  const requestDepositData = {
    websiteId: REBILLY_WEBSITE_ID,
    customerId,
    currency: "USD",
    amounts: req.body.amounts,
    strategyId: req.body.strategyId,
  };

  const { fields: depositFields } = await rebillySDK.depositRequests.create({
    data: requestDepositData,
  });

  response.token = exchangeToken.token;
  response.depositRequestId = depositFields.id;

  res.send(response);
});

module.exports = router;

const express = require("express");
const app = express();
const cors = require("cors");
const RebillyAPI = require("rebilly-js-sdk").default;
const port = 3000;

/**
 * App's Middleware
 * (Application-level middleware)
 */
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cors({ origin: true, credentials: true }));
app.disable("x-powered-by");

//  TODO: REPLACE THIS VALUES
const REBILLY_API_SECRET_KEY = "sk_sandbox_qlCaibzjEbFVifhgou_zg4VoKSqg34qeCUYxaew";
const REBILLY_WEBSITE_ID = "sun-dubai.ae";
const REBILLY_ORGANIZATION_ID = "phronesis-sun-dubai";
const rebilly = RebillyAPI({
  sandbox: true,
  apiKey: REBILLY_API_SECRET_KEY,
});

/**
 * App's Routes
 */
app.post("/deposit-request", async (req, res) => {
  const response = {};
  const customerId = "cus_01J69SYRK6AYWPYMS6MS9MJNNK"; // Customer: Test Tornike
  const data = {
    mode: "passwordless",
    customerId,
  };

  const { fields: login } = await rebilly.customerAuthentication.login({
    data,
  });

  const { fields: exchangeToken } = await rebilly.customerAuthentication.exchangeToken({
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
  };

  const { fields: depositFields } = await rebilly.depositRequests.create({
    data: requestDepositData,
  });

  response.token = exchangeToken.token;
  response.depositRequestId = depositFields.id;

  res.send(response);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

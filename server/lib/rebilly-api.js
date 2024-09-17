const RebillyAPI = require("rebilly-js-sdk").default;
const { REBILLY_API_SECRET_KEY } = require("../config/config");

const rebillySDK = RebillyAPI({
  sandbox: true,
  apiKey: REBILLY_API_SECRET_KEY,
});

module.exports = rebillySDK;

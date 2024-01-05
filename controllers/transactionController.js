const Vault = require("../models/vault");
const FireblocksSDK = require("fireblocks-sdk").FireblocksSDK;
const User = require("../models/user");
const fs = require("fs");
const path = require("path");
require("dotenv").config();
const PeerType = require("fireblocks-sdk").PeerType;

// Secured files
const api_key = process.env.API_KEY;
const apiSecret = fs.readFileSync(
  path.resolve(__dirname, "fireblocks_secret.key"),
  "utf8"
);
const baseUrl = process.env.BASE_URL;

const fireblocks = new FireblocksSDK(apiSecret, api_key, baseUrl);

const createVaultTransaction = async (req, res) => {
  try {
    const { assetId } = req.body;
    const { amount } = req.body;
    const { srcId } = req.body;
    const { destId } = req.body;

    let payload = {assetId,amount,
      source: {
        type: PeerType.VAULT_ACCOUNT,
        id: String(srcId),
      },
      destination: {
        type: PeerType.VAULT_ACCOUNT,
        id: String(destId),
      },
      note: "Your first transaction!",
    };
    const result = await fireblocks.createTransaction(payload);
    console.log(JSON.stringify(result, null, 2));
    res.status(201).json({
      message: "Transaction Created Successfully",
      data: result,
      status : "success"
    });

  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Bad Request", message: error });
  }
};

const getTransactions = async (req, res) => {
  try {
    const { from } = req.body;
    const { args } = req.body;

    const transactions = await fireblocks.getTransactions({
      status: args.status,
      after: from,
    });
    console.log(transactions);
    res
      .status(200)
      .json({
        message: "Transactions Fetched Successfully",
        data: transactions,
      });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Bad Request", message: error });
  }
};

module.exports = {
  createVaultTransaction,
};

const fs = require('fs');
const path = require('path');
const { FireblocksSDK } = require('fireblocks-sdk');
const { exit } = require('process');
const { inspect } = require('util');

const api_key =  "44b46aab-b20d-4cfb-8c5d-9bda3116ec2e"
const apiSecret = fs.readFileSync(path.resolve(__dirname, 'fireblocks_secret.key'), 'utf8');
const baseUrl = "https://sandbox-api.fireblocks.io";


const fireblocks = new FireblocksSDK(apiSecret, api_key, baseUrl);

(async () => {

    // Print vaults before creation
    let vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
    console.log(inspect(vaultAccounts, false, null, true),"-------");

    // Create vault account
    // const vaultCreation = await fireblocks.createVaultAccount("QuickStart_Vault");
    // console.log(inspect(vaultCreation, false, null, true));

    // Print vaults after creation
    vaultAccounts = await fireblocks.getVaultAccountsWithPageInfo({});
    console.log(inspect(vaultAccounts, false, null, true));

})().catch((e)=>{
    console.error(`Failed: ${e}`);
    exit(-1);
})
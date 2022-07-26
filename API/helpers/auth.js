const msal = require("@azure/msal-node");
const config = require('../config.json');

const LogLevel = msal.LogLevel;

const msalConfig = {
    auth: {
        clientId: config.azuread.clientID,
        authority: config.azuread.aadEndpoint + config.azuread.tenantId,
        clientSecret: config.azuread.clientSecret,
    }
};

const tokenRequest = {
    scopes: [config.azuread.graphEndpoint + '.default'], // e.g. 'https://graph.microsoft.com/.default'
};

const apiConfig = {
    uri: config.azuread.graphEndpoint + 'v1.0/users', // e.g. 'https://graph.microsoft.com/v1.0/users'
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

/**
 * Acquires token with client credentials.
 * @param {object} tokenRequest 
 */
async function getToken(tokenRequest) {
    return await cca.acquireTokenByClientCredential(tokenRequest);
}

module.exports = {
    apiConfig: apiConfig,
    tokenRequest: tokenRequest,
    getToken: getToken
};
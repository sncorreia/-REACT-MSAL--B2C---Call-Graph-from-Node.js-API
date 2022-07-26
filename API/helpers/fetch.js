const axios = require("axios");

async function callApi(endpoint, accessToken) {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    }

    console.log("Request made to " + endpoint + " at: " + new Date().toString());

    try {
        const response = await axios.default.get(endpoint, options);
        return response.data;
    } catch (error) {
        console.log("Error calling the API: " + error);
        return error;
    }
}

module.exports = {
    callApi: callApi
};
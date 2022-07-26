const express = require("express");
const router = express.Router();

const fetch = require('../helpers/fetch');
const auth = require('../helpers/auth');

router.route("/").get(async (req, res, next) => {
    const id = req.authInfo.oid;
    const apiEndpoint = `https://graph.microsoft.com/v1.0/users/${id}`;
    try {
        const authResponse = await auth.getToken(auth.tokenRequest);
        const userInfo = await fetch.callApi(apiEndpoint, authResponse.accessToken);
        console.log(userInfo);
        res.status(200).json(userInfo);
    } catch (error) {
        console.log(error);
        next(error);
    }
});

module.exports = router;
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const fs = require("fs");
const { TidalAPI } = require("tidal-music-api");

// add static file(s)
app.use(express.static(__dirname));
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// authentication
const config = JSON.parse(fs.readFileSync("auth.json"));

const clientId = config.clientId;
const clientSecret = config.clientSecret;

const axios = require("axios");

const TIDAL_AUTH_URL = "https://auth.tidal.com/v1/oauth2/token";
const TIDAL_API_URL = "https://api.tidal.com/v1";

function getAccessToken() {
    return axios.post(
        TIDAL_AUTH_URL,
        new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
        }),
        {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
    )
    .then(response => response.data.access_token)
    .catch(error => {
        console.error("Error obtaining access token:", error.response?.data || error.message);
        throw error;
    });
}

const accessToken = getAccessToken();

// handle users
io.on("connection", (socket) => {
    console.log(socket.id + " connected");

    socket.on("disconnect", () => {
        console.log(socket.id + " disconnected");
    });
});

// start server
server.listen(3000, () => {
    console.log("clientId:", clientId);
    console.log("server started on *:3000");
});
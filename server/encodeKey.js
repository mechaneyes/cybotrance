// Require file system module
const fs = require("fs");

// Read private key from file
const privateKey = fs.readFileSync("AuthKey_B5RUZ9LF74.p8").toString();

// Encode private key into Base64 string
const privateKeyBase64 = Buffer.from(privateKey).toString("base64");

// Write Base64 string to file
fs.writeFileSync("private_key_base64.txt", privateKeyBase64);
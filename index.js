const server = require('./src/config/express');
const { SERVER_PORT, timeout } = require('./src/config/vars').server;

// Start the server by listening on the specified SERVER_PORT
server.listen(SERVER_PORT, () => console.info(`Server is listening on port ${SERVER_PORT}`)).setTimeout(timeout);

// Export the configured server instance
module.exports = server;

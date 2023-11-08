const server = require('./src/config/express');
const { PORT, timeout } = require('./src/config/vars').server;

// Start the server by listening on the specified PORT
server.listen(PORT, () => console.info(`Server is listening on port ${PORT}`)).setTimeout(timeout);

// Export the configured server instance
module.exports = server;

const Hapi = require('@hapi/hapi');
// Import Routes Module
const routes = require('./routes');

// Initialize an async function to set up the Hapi server
const init = async () => {
  // Create Hapi server instance
  const server = Hapi.server({
    // Set the port for the server
    port: 9000,
    // Set the host for the server
    host: 'localhost',
    routes: {
      cors: {
        // Enable CORS for all origins
        origin: ['*'],
      },
    },
  });

  // Register routes with the server
  server.route(routes);

  // Start the server
  await server.start();
  // Print on server uri on console
  console.log(`Server running at: ${server.info.uri}`);
};

init();

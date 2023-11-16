// Import required modules
class WelcomeController {
	// Define a method 'welcome' that handles incoming requests
	welcome(req, res) {
		// Return a JSON response with a welcome message
		return res.json({
			msg: 'Welcome to the airbag-codeChallenge backend'
		});
	}
}

// Export an instance of the WelcomeController class to be used in other parts of the application
module.exports = new WelcomeController();

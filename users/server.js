// =======================
// Express Server Config
// =======================
// dependecies
const express = require("express");
//by convention we always write GraphQL <- this way, except for middleware
const expressGraphQL = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");
const app = express();
const PORT = 8000;

//middleware
app.use(
	"/graphql",

	expressGraphQL({
		//this is an options object
		schema, //ES6: when key & val have same var name we can just pass the var name
		graphiql: true,
	})
);

// listen
app.listen(PORT, () => {
	console.log(`Listening on Port ${PORT} 🍔🍟`);
});

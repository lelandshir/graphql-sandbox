const graphql = require("graphql");
// const _ = require("lodash"); //helper library to go through static list of users
const axios = require("axios");
//bring in the different types of data we're using
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
// Instruct GraphQL about what a User Obj looks like

//static source of data
// const users = [
// 	{ id: "23", firstName: "Leland", age: 31 },
// 	{ id: "31", firstName: "Sydney", age: 23 },
// ];

// Data Architecture
//Order of definition -> defined abover UserType
const CompanyType = new GraphQLObjectType({
	name: "Company",
	fields: {
		id: { type: GraphQLString },
		name: { type: GraphQLString },
		description: { type: GraphQLString },
	},
});

const UserType = new GraphQLObjectType({
	//required properties
	name: "User", //must be capitalized
	//fields obj tells GraphQL about the properties the user has
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
		company: {
			type: CompanyType,
			resolve: (parentValue, args) =>
				//run the resolve function in graphical by asking for the company; log parentValue and args to see if there's something we can use to grab the company (companyId: "#")
				// console.log(parentValue.companyId);
				axios
					.get(`http://localhost:3000/companies/${parentValue.companyId}`)
					.then((res) => res.data),
		},
	},
});

// an entry into our data graph
const RootQuery = new GraphQLObjectType({
	name: "RootQueryType",
	fields: {
		user: {
			type: UserType,
			// this says looking for a user? give me an id, I will give you a user
			args: { id: { type: GraphQLString } },
			// resolve function goes into db and returns the data we're looking for, take note that it also "resolves" differences between our json/incoming data model and the GraphQL Data Types (populate a property we don't have)
			resolve: (parentValue, args) =>
				//lodash helper returns a raw javascript obj
				/* resolve can also return a promise; nearly all req made are asynchronous so we return a promise; so we can make an http req inside the resolve function and return it's promise */
				// return _.find(users, { id: args.id });
				axios.get(`http://localhost:3000/users/${args.id}`).then((res) => {
					// console.log(res.data);
					return res.data;
				}),
			//Gotcha: When Axios' promise resolves, by default it nests the data on the data property. GraphQL does not know that, so we play with the response
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});

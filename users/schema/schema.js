const graphql = require("graphql");
const _ = require("lodash"); //helper library
//bring in the different types of data we're using
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema } = graphql;
// Instruct GraphQL about what a User Obj looks like

const users = [
	{ id: "23", firstName: "Leland", age: 31 },
	{ id: "31", firstName: "Sydney", age: 23 },
];
const UserType = new GraphQLObjectType({
	//required properties
	name: "User", //must be capitalized
	//fields obj tells GraphQL about the properties the user has
	fields: {
		id: { type: GraphQLString },
		firstName: { type: GraphQLString },
		age: { type: GraphQLInt },
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
			// resolve function goes into db and finds data we're looking for
			resolve(parentValue, args) {
				//lodash helper returns a raw javascript obj
				return _.find(users, { id: args.id });
			},
		},
	},
});

module.exports = new GraphQLSchema({
	query: RootQuery,
});

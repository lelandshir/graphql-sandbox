# graphql-sandbox

### Order

- server.js;
- schema/schema.js; tells GraphQL what our data looks like
-

### What is GraphQL?

- Understand RESTful Routing:

1. Some set of common conventions used in web development for manipulating a collection of data hosted on a server.
1. CRUD with data sitting on a server.

- RESTful Routing & Nested Data Issues:

1. Deciding on a URL schema gets tough when we have heavily nested relationships
1. `/users/23/posts` or `/users/23/posts/18` reads like plain English, but once we begin nesting more data things tend to get weird
1. When fetching heaily nested data we can make too many HTTP requests to get the data we need and dramatically over serve the client
1. Imagine how many separate requests we'd have to make to get the company and position of each of a users friends using the traditional endpoints. We'd end up having to make either too many HTTP requests or we'd end up with some very customized endpoints tightly coupled with lots of features.

### The Basics Of GraphQL:

- Form a graph of our data and the relationships
- Writing and executing a query in GraphQL
- We need to explicitly inform GraphQL about how the data in the app is arranged and how to access it in a `schema file`.

### About The Tech:

- An express server (hooked up to a data store)
- `GraphiQL` app: made for development, in broswer application to make test queries, similar to `Postman`
- Run `npm i --save express express-graphql graphql lodash`

#### Dependencies:

1. `express` handles incoming http requests and responds to users
1. `express1-graphql` is a compatibility layer between express and graphql; package helps them play nicely
1. `graphql` library
1. `lodash`, a useful library with utility functions

### Express server and GraphQL working together:

- GraphQL is one part of this app. Express takes requests from the client then checks to see if that request is asking for GraphQL. If:yes, the request goes to GraphQL which sends a response to Express, which sends the response to the user. If:no, Express sends the response via Express per usual.
- `app.use()` - Middleware are tiny functions made to intercept or modify requests as they come through an express server

### Schema

### Root Query

- An entry point into our data
- Allows us to jump into our graph of data,

### GraphiQL App

- Query:

```{
      user(id: "23"){
          friends(){
              company(){
                  name
              }
          }
      }
  }
```

`or`

```{
      user(id: "23"){
          friends(){
              company(){
                  name
                  age
                  id
              }
          }
      }
  }
```

### GraphQL can serve as a Proxy of sorts

- GQL server can make HTTP requests to another server with it's own DB, a 3rd party API, whatever - it can grab data and return it back with it's queries.

#### JSON-Server for separate data

- `npm i --save json-server`
- Building small and fast little fake API's here
- `https://github.com/typicode/json-server`
- Note that the `companyId` key in db.json sets up a relationships between top levels of data.
- Thus we can `/companies/1/users` to retrieve users who work at the company with an id of 1
- This restful relation is being set up by `json-server` becaue of the id fields we set

### Axios

- `npm i --save axios`

### What Is the Schema?

- Think of our schema/data as bunch of functions that return references to other objects in our Graph. Each edge/node on the graph is a resolve function. The data is all related via a resolve()

# graphql-sandbox

### Notes

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

```query {
      user(id: "23"){
          friends(){
              company(){
                  name
              }
          }
      }
  }
```

```

```

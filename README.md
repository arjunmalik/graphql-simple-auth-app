# GraphQL with React (Apollo Client)
Restful Routing vs GraphQL
---------------------------

1. Restful routing are conventions used in web-development for manipulating the data on the server, when used with http most common set of operations are post, get, put, delete.
   Graphql on the other hand is also an API design structure, which is a representation of all the resources in our application as nodes and all the relation as edges, in the form of graph.
2. Restful routing with highly related data start to gets messy, we either end up doing too many http requests or writing lots of endpoints very tightly coupled with the type of data we need on the frontend. Decuding on the url schema starts to gets tough on a heavily nested relationships.
3. Restful routing is also vulnerable to overfetching of the data.

For ex: To fetch the companies list of all the friends of user - 23.
We either have to do many http requests - users/23/friends will give the list of all the friends of the user, and then for each user we feth the company list.
Or we have to write endpoints very tightly coupled to the kind of data we need on the UI - users/23/friends/companies, or users/23/friends_with_comapnies_and_positions if we also want the postion list along with company list, breaking the restful conventions.

In case of GraphQL which reresents all our data in the form of graph and all the relations in the form of edges:
i) Find a node/user with id 23.
ii) Then find all the friend/relation/edge associated with the user.
iii) Finally get the company of all the friends.
(Library to crawl through our data).

 Fundamentals of GraphQL
-------------------------
1. GraphQL doesn't go to our databases and figure out the relationships, we have to very specifically tell graphQL how our data is arranged and how it can be accessed,
2. schema.js - all the knowledge of how our application looks like, what properties it have and all the relations.
3. Root Query - Entry point of our application, that allows us to jump at a specific point in our application. All the queries in graphql gets send to the rootQuery type, which searches for that type inside its field object.
4. Object Types - GraphQL Object types, that defines the datatypes for the data in our application, which has two required properties name of the object type, and the fields object. It can also optional resolve property, to programitically fetch/resolve a field.
5. GraphQL can serve a proxy of sort to go to many servers, fetch the data from them, assemble it, and send it back as response (graphql can return promise from resolve).
6. Association - We define association as if it were another field in that object, giving it our own custom defined type for that assoication and giving it a resolve-function(function which helps us jump from one point of graph to another point, that returns reference to another object in our graph) for the value.
7. Each edge on the grah can be thought of as a resolve funtion, in case of circular reference, wrap the field object inside an arrow function.
8. The second part of the schema file are mutations, which are used to modify the data in some fashion. Mutation logic never goes inside the Object type definition, we need to create new object for mutations. Each field in mutation can have type, which defines the type of data that will be returned from this mutation, args - the params that this mutation will receive and resolve function where the actual logic of the mutaion goes, the mutation property name describes the kind of operation that this mutation is going to perform.
9. All the mutations should be the part of field property of the mutation object. We annotate the type of data that will be returned using the type property of the mutation, so that graphql will know what will be returned.

GraphQL clients - (Apollo)
--------------------------
1. React will be very tightly coupled with the graphql client and this client will issue the query to the graphql server and pass on the data to the react UI, thus acting as binding layer between react and graphql.
2. Three famous clients, lokka - simple client with some caching features, apollo client, relay client - currently little complex (designed for third world countries with extraordinary performance on low internet), also the facebook interface with graphql.
3. Apollo client comprises of - apollo store: store of data that is stored on the client side, apollo provider - the glue layer between apollo store and our application. Apollo doesn't care what we are using at the backend.
4. We define the query using gql helper from graphql-tag, all we have to do is define the query, apollo and graphql will do the job to fetch the data for us.
5. graphql from react-apollo is used to bind the component with the actual data, it executes the query when our component gets rendered. The data fetched from the server is placed on the props behind the scenes by apollo.
6. Query variables are used to inject some value into the queries/mutations. This becomes extremely useful when using props/state variables. $variable is used to declare these variables, and they becomes accessible everywhere in the query/muatation.
7. Apollo Client uses cold cache - already fetched query do not fire again, unless we manually fires again. This is to stop unnecessary fetch queries call on mutations. Use refetchQueries to force graphql to fetch the query again.
8. GraphQL queries are executed automatically for us on the component render, and the result is cold cached, stored in Apollo store and passed down to the component in the form of props. However mutations has to be run manually.
9. Apollo has internal list of data/buckets where it stores all the data, however when we run any mutation and the data is returned, apollo has no idea of the data that is returned and the data that is stored are related to each other.
But if we provide ID to all the components that we use inside the graphql object types, apollo uses this ID to communicate to the components, that if you have anything related to the ID, this is the time to re-render yourself.
10. Whenever we refetch any query, all the components using that query re-render themselves.
11. When we run any mutation, we can also provide with an optimistic response property, which is like we are telling apollo what we expect to get from the backend, for immediate update on the UI. When the response is recieved apollo matches it with the optimistic property and updates the UI.
12. In case of mutaions we can pass the query variables directly when we run the mutations, however queries are automatically executed by apollo at the time of component rendering, and the only way to pass query variables is to write a wrapper, and pass these query variable to the options property.
For ex: export default graphql(fetchSong, {
  options: (props) => { return { variables: { id: props.params.id}}}
})(SongDetail);
13. Keep as much less logic as possible in mutations, use helper functions instead, mutations are central place for all the data that can be modified, with as much less business logic as possible.

Use the Application
--------------------
1. npm install
2. npm run dev (by default application will be served on http://localhost:4000/)
To successfully run this app please provide the MogoDB URI for your cluster in file server.js, const MONGO_URI. Clusters can be created free of cost at https://cloud.mongodb.com.

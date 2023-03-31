# GraphQL-API-For-Asha-Workers
This is a Node.js application that exposes a GraphQL API to interact with a MongoDB database. It provides functionalities to get, search and create records related to family information and ASHA workers.

## Dependencies

This application requires the following dependencies:

express: for building the web server.
mongodb: for accessing the MongoDB database.
body-parser: for parsing incoming request bodies.
express-graphql: for exposing the GraphQL API.
mongoose: for defining the MongoDB models and schemas.
cors: for enabling Cross-Origin Resource Sharing (CORS).

How to run

To run the application, first install the dependencies by running:  
npm install  
Then, create a .env file with the following environment variables:  
DB_USERNAME=<your mongodb username> 
DB_PASSWORD=<your mongodb password> 
DB_NAME=<your mongodb database name> 
This will start the server on port 3000 by default.

## API Endpoints

The following GraphQL API endpoints are exposed:

GET /graphql: returns the GraphQL Playground interface.
POST /graphql: handles GraphQL queries and mutations.

## GraphQL API

The GraphQL API provides the following functionalities:

getFamilies: retrieves a list of families belonging to an ASHA worker.
getAshaWorker: retrieves information about a specific ASHA worker.
getFamily: retrieves information about a specific family.
searchName: searches for a family by name.
createFamily: creates a new family record in the database.

## Models

This application defines two MongoDB models:  

Family: defines the schema for a family record.  
AshaWorker: defines the schema for an ASHA worker record.  
These models are defined in the models directory.  

## Schema

The GraphQL schema is defined in the schema.js file. It defines the types and queries/mutations available in the API.

## Functions

This application defines a helper function setDefaultVal that sets default values for some fields in a family record. This function is used in the createFamily mutation resolver.  

## Error Handling

This application defines a custom error handler middleware in the index.js file. This middleware catches any unhandled errors and returns a JSON response with the error message and status code.



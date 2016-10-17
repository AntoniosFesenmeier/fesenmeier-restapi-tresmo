# fesenmeier-restapi-tresmo

# Calling the api via Heroku
https://guarded-temple-58570.herokuapp.com/api/v1/wines

# Necessary enviroment variables
- MONGODB_URI
- PORT
- LOG_LEVEL [fatal, error, warn, info, debug]
- NODE_ENV [debug || development for local logging]

# Optimization options for the api
For the future the following points can be improved:
- Implementation of the HATEOAS principle 
- Adapation of the eslint configuration to the Tresmo guidelines<br>Actual configuration was made via 'eslint --init'. The configuration should also adapted to fit mocha testfiles. 
- Usage of a mocking tool for database independent tests
- Automated generation of the ID for database objects
- Usage of Docker and some queueing tools for better concurrency and disposability
- Usage of some heroku addons for better analysis

# Optimization options for the specification
- Definition of the tresmo coding guidelines


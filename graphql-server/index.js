const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const dbConfig = require('./config/db.config');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieSession = require("cookie-session");
var cookieParser = require('cookie-parser');
var corsOptions = {
  origin: "http://localhost:4200"
};
const app = express();
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// app.use(
//   cookieSession({
//     name: "bezkoder-session",
//     secret: "COOKIE_SECRET", // should use as secret environment variable
//     httpOnly: true
//   })
// );
app.use(cookieParser());
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

const db = require("./models");
const Role = db.role
// Load db methods
const mongoDataMethods = require('./data/db');
// connect to mongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(dbConfig.DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB connected');
    initial();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
connectDB();
const ads = [
  { title: 'Hello, world (again)!' }
];
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


// ------------graphql config----------
// load schema & resolvers
// const typeDefs = require('./schema/schema');
// const resolvers = require('./resolver/resolver');
// async function startApolloServer(typeDefs, resolvers, mongoDataMethods) {
//   // Same ApolloServer initialization as before
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     context: () => ({ mongoDataMethods })
//   })

//   // Required logic for integrating with Express
//   await server.start();

//   const app = express();

//   app.use(express.json());
//   // adding Helmet to enhance your API's security
//   app.use(helmet());
//   // enabling CORS for all requests
//   app.use(cors());

//   // adding morgan to log HTTP requests
//   app.use(morgan('combined'));

//   // defining an endpoint to return all ads
//   app.get('/',async (req, res) => {
//     res.send({ "title": "Hello, world (again)!"});
//   });
//   app.post('/authen/getUser',async (req, res) => {
//     res.send(await mongoDataMethods.getUser(req.body));
//   });

//   server.applyMiddleware({
//     app,
//     // By default, apollo-server hosts its GraphQL endpoint at the
//     // server root. However, *other* Apollo Server packages host it at
//     // /graphql. Optionally provide this to match apollo-server.
//     // path: '/'
//   });
//   // Modified server startup
//   await new Promise(resolve => app.listen({ port: 4000 }, resolve));
//   console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
// }
// startApolloServer(typeDefs, resolvers, mongoDataMethods)



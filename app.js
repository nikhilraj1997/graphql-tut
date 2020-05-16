const express = require("express")
const bodyParser = require("body-parser")
const graphQlHttp = require("express-graphql")
const mongoose = require("mongoose")

const graphQlSchema = require("./graphql/schema/index")
const graphQlResolvers = require("./graphql/resolvers/index")
const isAuth = require("./middleware/is-auth")

const app = express()
const port = process.env.PORT || 8000

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
  if (req.method === "OPTIONS") {
    return res.sendStatus(200)
  }
  next()
})

app.use(isAuth)

app.use(
  "/graphql",
  graphQlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
)

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_URL}/${process.env.MONGO_DB}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`GraphQl server running on port ${port}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })

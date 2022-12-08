const { MongoClient, ServerApiVersion } = require("mongodb")
async function connectToMongo() {
  const dbPassword = encodeURIComponent(process.env.DB_PASSWORD)
  const dbUser = encodeURIComponent(process.env.DB_USERNAME)
  const uri = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.utnjrdp.mongodb.net/?retryWrites=true&w=majority`
  const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  })

  try {
    console.log("Connecting to MongoDB...")
    await client.connect()
    console.log("Connected")
  } catch (err) {
    console.error(err)
    client.close()
  }

  return client
}

module.exports = { connectToMongo }

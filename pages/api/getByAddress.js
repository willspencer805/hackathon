import nc from "next-connect"
import { connectToMongo } from "../../api-lib/connect"

const getByAddress = nc({
  onError: (err, req, res, next) => {
    console.log(err)
    res.status(500).end(err.toString())
  },
  onNoMatch: (req, res) => {
    res.status(404).json({ error: { message: "route not found" } })
    return
  },
  attachParams: true,
}).get(async (req, res) => {
  const client = await connectToMongo()
  const connectedAddress = req.query.address

  const pipeline = [
    `{
      '$search': {
        'index': 'address',
        'text': {
          'query': '${connectedAddress}',
          'path': {
            'wildcard': '*'
          }
        }
      }
    }`,
  ]
  console.log(connectedAddress)
  try {
    console.log("querying")
    const result = await client
      .db("guild")
      .collection("master")
      .aggregate(pipeline)

    client.close()
    return result
  } catch (err) {
    console.error(err)
    client.close()
    return
  }
})

export default getByAddress

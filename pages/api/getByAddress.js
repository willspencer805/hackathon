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
  const tokenType = req.query.type || 'guild'
  // const pipeline = [
  //   {
  //     $search: {
  //       index: "address",
  //       text: {
  //         query: `${connectedAddress}`,
  //         path: {
  //           wildcard: "*",
  //         },
  //       },
  //     },
  //   },
  // ]
  console.log(connectedAddress)
  try {
    console.log("Querying for token by address")
    const result = await client
      .db(tokenType)
      .collection("master")
      .findOne({ address: `${connectedAddress}` })

    console.log("Retrieved data for address")
    console.log(result)
    client.close()
    res.send(JSON.stringify(result.name))
  } catch (err) {
    console.error(err)
    client.close()
    return
  }
})

export default getByAddress

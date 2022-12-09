import nc from "next-connect"
import { connectToMongo } from "../../api-lib/connect"

export const getByType = nc({
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
  const tokenType = req.query.tokenType || 'guild'
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
  console.log(tokenType)
  try {
    console.log("querying for tokens by", tokenType)
    const result = await client
      .db(tokenType)
      .collection("master")

    console.log("Retrieved data for type of token")
    console.log(result)
    client.close()
    res.send(JSON.stringify(result.name))
  } catch (err) {
    console.error(err)
    client.close()
    return
  }
})

export const getByTypeAndTag = nc({
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
    const tokenType = req.query.tokenType || 'guild'
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
      console.log("querying for tokens by", tokenType)
      const result = await client
        .db(tokenType)
        .collection("master")
        .find({
            $and: [
              {
                type: {
                  $eq: tokenType
                }
              },
              {
                tag: {
                  $eq: true
                }
              }
            ]
          })
  
      console.log("Retrieved data for type of token that is starred")
      console.log(result)
      client.close()
      res.send(JSON.stringify(result.name))
    } catch (err) {
      console.error(err)
      client.close()
      return
    }
  })

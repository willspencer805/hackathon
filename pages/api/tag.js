import nc from "next-connect"
import { connectToMongo } from "../../api-lib/connect"

export const tagTokenByAddress = nc({
  onError: (err, req, res, next) => {
    console.log(err)
    res.status(500).end(err.toString())
  },
  onNoMatch: (req, res) => {
    res.status(404).json({ error: { message: "route not found" } })
    return
  },
  attachParams: true,
}).post(async (req, res) => {
  const client = await connectToMongo()
  const tokenAddress = req.params.address
  const tokenType = req.params.type || 'guild'
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
  console.log(tokenAddress, tokenType)
  try {
    console.log("Querying for token by address")
    const result = await client
      .db(tokenType)
      .collection("master")
      .update({address: tokenAddress}, {$set: {tagged: true}}, {multi: true})

    console.log("Tagged a token successfully")
    console.log(result)
    client.close()
    res.send(JSON.stringify(result.name))
  } catch (err) {
    console.error(err)
    client.close()
    return
  }
})

export const removeTagByAddress = nc({
    onError: (err, req, res, next) => {
      console.log(err)
      res.status(500).end(err.toString())
    },
    onNoMatch: (req, res) => {
      res.status(404).json({ error: { message: "route not found" } })
      return
    },
    attachParams: true,
  }).post(async (req, res) => {
    const client = await connectToMongo()
    const tokenAddress = req.params.address
    const tokenType = req.params.type || 'guild'
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
    console.log(tokenAddress, tokenType)
    try {
      console.log("Querying for token by address")
      const result = await client
        .db(tokenType)
        .collection("master")
        .update({address: tokenAddress}, {$set: {tagged: false}}, {multi: true})
  
      console.log("Removed the tag on a token successfully")
      console.log(result)
      client.close()
      res.send(JSON.stringify(result.name))
    } catch (err) {
      console.error(err)
      client.close()
      return
    }
  })
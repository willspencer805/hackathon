import nc from "next-connect"
import { connectToMongo } from "../../api-lib/connect"

const insertAttendees = nc({
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
  const data = JSON.parse(req.body.data)
  console.log("inserting into database...")
  try {
    await client.db("guild").collection("attendees").insertMany(data)
    res.status(200).json({ Response: { message: "Transaction completed!!" } })
  } catch (error) {
    console.log(error)
    res.status(500)
  }

  return
})

export default insertAttendees

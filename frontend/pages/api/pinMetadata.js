import nc from "next-connect"

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
}).post(async (req, res) => {
  try {
    console.log("TOOD")
  } catch (err) {
    console.error(err)
    client.close()
    return
  }
})

export default getByAddress

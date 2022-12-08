import React, { useState } from "react"

function CSVFileInput() {
  const [data, setData] = useState(null)

  function handleFileChange(event) {
    // Check if the file is a CSV file
    const file = event.target.files[0]
    if (!file.name.endsWith(".json")) {
      alert("Please select a JSON file.")
      return
    }

    // Create a new FileReader object
    const reader = new FileReader()

    // Set the onload event handler for the FileReader
    reader.onload = function () {
      // Parse the CSV file content
      const csvData = reader.result
      // const parsedData = Papa.parse(csvData)

      // Set the parsed data in state
      setData(csvData)
      insert(csvData)
    }
    // Read the CSV file
    reader.readAsText(file)

    async function insert(data) {
      const endpoint = "../api/insertAttendees"
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: data,
        }),
      }
      const response = await fetch(endpoint, options)

      if (response.status == 200) {
        console.log("insert successful")
      } else {
        alert("insert unsuccessful")
      }
    }
  }

  return (
    <>
      <input type="file" onChange={handleFileChange} />
      {data ? <pre>{data}</pre> : <p>No data</p>}
    </>
  )
}

export default CSVFileInput

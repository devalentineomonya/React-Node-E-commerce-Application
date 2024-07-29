const express = require("express")
const app = express()
app.get("/",(req, res)=>{
    res.send("App running")
})

app.listen(3000, ()=>{
    console.log("App running on port 3000"  )
})
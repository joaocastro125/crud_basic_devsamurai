// @ts-nocheck

const express = require('express')

const app = express()
app.use(express.json())

const customers = [
    { id: 1, name: "devsamurai", site: "https://devsamurai.com.br" },
    { id: 2, name: "google", site: "https://google.com.br" },
    { id: 3, name: "uol", site: "https://uol.com.br" },
]

app.get("/customers", (req, res) => {
    res.json(customers)
})
app.get("/customers/:id", (req, res) => {

    const id = Number(req.params.id)
    const customer = customers.find(item => item.id === id)
    const status = customer ? 200 : 404
    res.status(status).json(customer)
})
app.post("/customers", (req, res) => {
    const { name, site } = req.body
    // utilizou o banco fake , depois selecionou o banco e pegou o tamanho e o ultimo elemento ,pegar o id adicona mais um 
    const id = customers[customers.length - 1].id + 1
    const nextId = { name, site, id }
    customers.push(nextId)



    res.status(201).json(nextId)

})
app.put("/customers/:id",(req,res)=>{
    
    const id = Number(req.params.id)
    //recuperei name , site
    const { name, site } = req.body

    const idIndex=customers.findIndex(item=>item.id===id)
    const status=idIndex>=0?200:404

    if(idIndex>=0){
       customers[idIndex]={id,name,site}
    }
  res.status(status).json(customers[idIndex])


})
app.delete("/customers/:id",(req,res)=>{
    const id = Number(req.params.id)
    const idIndex=customers.findIndex(item=>item.id===id)
    const status=idIndex>=0?200:404
    if(idIndex>=0){
        customers.splice(idIndex,1)
     }

     res.status(status).json()
})

app.listen(3000)
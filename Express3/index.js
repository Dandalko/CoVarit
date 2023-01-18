require ('dotenv').config() // nacita config z .env (potom je pristupny cez process.env)
const { Database } = require('arangojs') // nacitanie z balicka arangojs
const express = require('express') // nacitanie z balicka express

const app = express(); // vytvorenie express aplikacie (huraaa, ide sa robit server)
const PORT = 3000;

const database = new Database({
    url: "http://localhost:8529", // http://localhost:8529
    databaseName: "recipes", // recepies (vytvorite cez WEB API -> _system -> databases -> create)
    auth: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD
    }
})

app.use(express.json())

app.post("/receipt", async (req, res) => {
    const col = database.collection("Ingrediences")
    await col.save(req.body)
    return res.sendStatus(201)
})

app.get("/recipes", async (req, res) => {
    const Recipes = []

    const cursor = await database.query(`
        FOR doc IN Recipes
            RETURN doc
    `)

    while(cursor.hasNext) {
        const doc = await cursor.next()
        Recipes.push(doc)
    }

    return res.json(Recipes)
})

app.get("/receipt/:key", async (req, res) => {
    const col = database.collection("Recipes")
    const doc = await col.document(req.params.key)
    return res.json(doc); 
});
app.get("/receipt/:name", async (req, res) => {
    const col = database.collection("Recipes")
    const doc = await col.document(req.params.name)
    return res.json(doc); 
});

app.get("/receipt/params", async (req, res) => {
    const Recipes = []

    const cursor = await database.query(`
        FOR doc IN Recipes
            RETURN doc
    `)
    const doc = await Recipes(req.body)
    return res.json(doc); 
});
/*

app.post("/receipt/paramsI", async (req, res) => {
    const colR = database.collection("Recipes")
    const colI = database.collection("Ingrediences")
    const edgeRI = database.collections("RecipesIngrediences")
    const name = (req.body.name)
    const ingredience = (req.body.ingredience)
    return res.json(doc); 
    
});

app.post("/receipt/paramsII", async (req, res) => {
    const colR = database.collection("Recipes")
    const username = colR.getElementById('name').value
    
    return res.json(username); 
    
});
app.post("/receipt/paramsIII", async (req, res) => {
    const colR = database.collection("Recipes")
    const username = colR.getElementById('name').value
    
    return res.json(username); 
    
});*/

app.post("/recipe/reqParams", async (req, res) => {
    res.json = (req.body)
    let ReqName =res.json.name
    let ReqAmount =res.json.amount
    const ReqIngrediences =[res.json.ingredience,res.json.ingredience2,res.json.ingredience3,res.json.ingredience4]

    for(let i =0;i<ReqAmount;i++){
        console.log(ReqIngrediences[i])
    }

    console.log(ReqName,ReqAmount); 

    /*const Recipes = []
    for(let i =0;i<1;i++){
        console.log(ReqIngrediences[i])
    }

    const colI = database.collection("Ingrediences")
    const colR = database.collection("Recipes")
    console.log (Recipes)*/
    
})

app.post('/test', (req, res) => {
    res.json = ({requestBody: req.body})
    res.send(res.body.name);
  })

  app.post('/', function(req, res){
    console.dir(req.body);
    
  })


app.listen(PORT , () => {
    console.log('Server is listening on port 3000...')
})
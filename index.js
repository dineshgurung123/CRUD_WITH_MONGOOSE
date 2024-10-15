const express = require('express')
const mongoose = require('mongoose');

const Product = require('./models/product.model.js')
const app = express()



//middleware to parse json request body
app.use(express.json());

app.listen (3000, ()=>{

console.log('server running on port 3000');

})


app.get('/', (req, res)=>{

res.send("Hello from node API server");

})

app.get('/api/products', async(req, res)=>{

try{

  const products = await Product.find({})
   res.status(200).json(products);

}
catch(error){

    res.status(500).json({
        message : error.message
    })
}



})



app.get('/api/products/:id', async(req, res) =>{

try {

     const {id} = req.params;

   const products =  await Product.findById(id);
     res.status(200).json(products)


} catch (error) {
    
res.status(500).json({

    message : error.message
})

}


})



app.post('/api/products', async(req, res)=>{

try {
    

    const product = await Product.create(req.body);
    res.status(200).json(product);


} catch (error) {
    
    res.status(500).json({

        message : error.message
    })
}

})

// Update a product



app.put('/api/products/:id', async(req, res)=>{

 try{

  const {id} = req.params;

  const product = await Product.findByIdAndUpdate(id, req.body, {new: true});
  res.status(200).json(product); 

  if(!product){

    return res.status(404).json({
        message: "product not found"
    })

  }

  

 }

 catch(error){

res.status(500).json({

    message: error.message
})

 }
})


//delete a product

app.delete('/api/product/:id', async(req, res)=>{

try{

const {id} = req.params;

 const  product = await Product.findByIdAndDelete(id);


   
 if(!product){

    return res.status(400).json({
        message : "product not found"
    })
 }

 res.status(200).json({

    message : "deleted successfully"
 })


}

catch(error){

    res.status(500).json({
        message : error.message
    })

}





})





mongoose.connect("mongodb+srv://root:sspear54321@root.zuwsh.mongodb.net/?retryWrites=true&w=majority&appName=root")
.then(()=>{
console.log("Database connected");

})

.catch(()=>{

    console.log("Connection failed");
})
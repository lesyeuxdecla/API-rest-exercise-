import express from "express";

const app = express();
app.use(express.json());

    //verifica se a aplicação está rodando
    app.get("/", (req, res) => {
        res.status(200).send("OK");
    });


    //lista de produtos
    const products = [
        {
            id: 1,
            description: "Bolo de Chocolate",
            price: 20.0,
            quantity: 10
        },
        {
            id: 2,
            description: "Pão Francês",
            price: 1.5,
            quantity: 200
        },
        {
            id: 3,
            description: "Croissant",
            price: 5.0,
            quantity: 50
        }
    ];

    //buscar o índice de um produto pelo id
    function searchProducts(id) {
        return products.findIndex(product => 
            product.id == Number(id));
    }


    //buscar todos os registros de produto
    app.route("/products")
        .get((req, res) => {
        res.status(200).json(products);
    })
    //criar um novo registro de produto
        .post((req, res) => {
            products.push(req.body);
            res.status(201).send("Produto inserido com sucesso");
    });

app.route("/products/:id")
    //buscar um registro pelo id
    .get((req, res) => {
    const id = searchProducts(req.params.id);
        res.status(200).json(products[id]);
    })
    //atualizar um registro pelo id
    .put((req, res) => {
    const id = searchProducts(req.params.id);
    products[id].description = req.body.description;
    products[id].price = req.body.price;
    products[id].quantity = req.body.quantity;
        res.status(200).json(products[id]);
    })
    //deletar um registro pelo id
    .delete((req, res) => {
    const id = searchProducts(req.params.id);
    if (products[id]) {
        products.splice(id, 1);
        res.status(200).send("Produto removido com sucesso");
    } else {
        res.status(404).send("Produto não encontrado");
    }
});

export default app;

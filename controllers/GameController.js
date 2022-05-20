//simulando banco
let DB = {
    games: [
        {
            id: 1,
            title: "Call of duty",
            year: 2019,
            price: 60
        },
        {
            id: 2,
            title: "Far Cry 6",
            year: 2022,
            price: 120
        },
        {
            id: 3,
            title: "Resident evil 5",
            year: 2012,
            price: 30
        },
    ]
}

const games = (req, res)=>{
    res.statusCode = 200;
    res.json(DB.games)
}

const game = (req, res)=>{

    const id = req.params.id;

    if(isNaN(id)){
        res.sendStatus(400);
        return;
    }

    const game = DB.games.find(g=> g.id == id)

    if(!game){
        res.sendStatus(404);
        return
    }

    res.statusCode = 200;
    res.json(game)
}

const newGame = (req, res)=>{
    const {id, title, year, price} = req.body

    if(id === undefined || isNaN(id)) return res.sendStatus(400) 
    if(title === undefined) return res.sendStatus(400)
    if(year === undefined  || isNaN(year)) return res.sendStatus(400)
    if(price === undefined  || isNaN(price)) return  res.sendStatus(400)


    DB.games.push({id, title, year, price}) 

    res.sendStatus(200)

}

const destroy = (req,res) => {
    const id = req.body.id

    if(id === undefined || isNaN(id)) return res.sendStatus(400) 

    const index = DB.games.findIndex(g => g.id == id)

    if(index === -1) return res.sendStatus(400) 

    DB.games.splice(index, 1)
    res.sendStatus(200)

}

const update = (req,res)=>{
    const id = req.params.id;

    if(isNaN(id)) return res.sendStatus(400);

    const game = DB.games.find(g=> g.id == id)

    if(!game) return res.sendStatus(404);

    const {title, year, price} = req.body

    if(title === undefined && year === undefined  && price === undefined ) return res.sendStatus(400)
    if(title === undefined) return res.sendStatus(400)
    if(year === undefined  || isNaN(year)) return res.sendStatus(400)
    if(price === undefined  || isNaN(price)) return  res.sendStatus(400)

    game['title'] = title
    game['year'] = year
    game['price'] = price

    res.sendStatus(200)

}

const updateParcial = (req,res) => {
    const id = req.params.id;

    if(isNaN(id)) return res.sendStatus(400);

    const game = DB.games.find(g=> g.id == id)

    if(!game) return res.sendStatus(404);

    const {title, year, price} = req.body

    if(title != undefined && year != undefined  && price != undefined ) return res.sendStatus(400)
    if(title === undefined && year === undefined  && price === undefined ) return res.sendStatus(400)

    if(title != undefined){
        game['title'] = title
    }

    if(year != undefined){
        if(isNaN(year)) return res.sendStatus(400)
        game['year'] = year
    }

    if(price != undefined){
        if(isNaN(price)) return res.sendStatus(400)
        game['price'] = price
    }

    res.sendStatus(200)
}

module.exports = {
    games,
    game,
    newGame,
    destroy,
    update,
    updateParcial
}
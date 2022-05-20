//simulando banco
const DB = {
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


module.exports = {
    games,
    game
}
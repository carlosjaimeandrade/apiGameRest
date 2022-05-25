//simulando banco
const jwt = require("jsonwebtoken");

const JWTsecret = "PKSAPADJfousapokaposiak090ak0-12kpasodi2ik1=9-"

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
    ],
    users:[
        {
            id: 1,
            name: "Calors Jaime",
            email: "jaime_andrek@hotmail.com",
            password: "123"
        },
        {
            id: 2,
            name: "Antonio",
            email: "antonio@hotmail.com",
            password: "123"
        }
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
    const id = req.params.id
    console.log(id)
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

const auth = (req,res)=>{
    const {email, password} = req.body

    if(email == undefined){
        res.status(400)
        res.json({err: "O e-mail é inválido"})
        return
    }

    const user = DB.users.find(user => user.email === email)

    if(user == undefined){
        res.status(404)
        res.json({err: "Não foi encontrado o usuário"})
        return
    }

    if(user.password == password){

        jwt.sign({id: user.id, email: user.email}, JWTsecret,{ expiresIn: '48h'},(err, token)=>{
            if(err){
                res.status(400);
                res.json({err: "Falha interna"})
                return
            }

            res.status(200);
            res.json({token: token})

        })
    }else{
        res.status(401)
        res.json({err: "Não autorizado"})
    }


}

module.exports = {
    games,
    game,
    newGame,
    destroy,
    update,
    updateParcial,
    auth
}
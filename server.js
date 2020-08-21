const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    const about = {
        avatar_url: "https://avatars3.githubusercontent.com/u/43589505?s=460&u=7c7159850e84526c0127a00fa34e70da1a938e4f&v=4",
        name: "Júniior Silva",
        role: "Developer web",
        descrition: "Programador fullstack, focado em trazer o melhor ensino para iniciantes em programação.",
        links: [
            { name: "Github", url: "https://github.com/juniorsilvacc" },
            { name: "Instagram", url: "https://www.instagram.com/juniorsilva.eng/" },
            { name: "Linkedin", url: "https://www.linkedin.com/in/j%C3%BAniior-silva-7937b3192/" }
        ]
    }

    return res.render("about", { about })
})

server.get("/portfolio", function (req, res) {

    return res.render("portfolio", {items: videos})
})

server.get("/video", function(req, res) {
    const id = req.query.id

    const video = videos.find(function(video) {
        return video.id == id
        
    })

    if(!video){
        return res.send("video not found")
    } 

    return res.render("video", { item: video })
})

server.listen(5000, function () {
    console.log("server is running")
})
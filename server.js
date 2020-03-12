const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const date = require(__dirname + '/date.js');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');


const items = [];
const workItems = [];

app.get("/", function(req, res) {
    /*let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);*/
    let day = date.getCurrentDate();

    res.render("list", {
        listTitle: day,
        newListItems: items
    });
});

app.post("/", (req, res) => {
    let item = req.body.newItem;

    if(req.body.list === "Work"){
        let item = req.body.newItem;
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});


app.get("/work", (req, res)=>{
    res.render("list", {
        listTitle: "Work",
        newListItems: workItems
    });
});

/*app.post("/work", (req, res) => {
    console.log(req.body);
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});*/

app.listen(3000, () => {
   console.log("Server is running on port 3000");
});
import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
var YouareWelcome = false;

const app = express();
const port = 3000;

let blogs = [
    // Existing blogs go here
        {
            title: 'TITLE HEADING',
            content: 'Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
            date: 'Title description, Dec 7, 2020',
        }
];

app.use(bodyParser.urlencoded({ extended: true }));

function Secrets(req, res, next) {
    
    if(req.body["pswd"] === "AshPika18" && req.body["email"] === "vedantparkhe2409@gmail.com"){
        YouareWelcome = true;
    }
    console.log(req.body);
    next();
}

app.use(Secrets);

// function addBlog(){
    
// }

// app.use(addBlog);

app.get('/',(req, res) => {
    res.render('index.ejs');
})

app.post('/home',(req,res) => {
    if(YouareWelcome){
        res.render('home.ejs',{ blogs });
    }
    else{
        res.render('index.ejs');
    }
})

app.get('/about',(req,res) => {
    res.render('about.ejs');
})

app.get('/Add',(req,res) => {
    res.render('add.ejs');
})

app.post('/submit', (req, res) => {
    const { blogTitle, blogContent } = req.body;

    // Validate if the title and content are present
    if (blogTitle && blogContent) {
        // Add the new blog to the array
        const newBlog = {
            title: blogTitle,
            content: blogContent,
            date: new Date().toLocaleDateString(),
        };

        blogs.push(newBlog);
        console.log('New blog added:', newBlog);
    }

    res.render('home.ejs', {blogs});
        // res.redirect('/home');
});


app.listen(port, () => {
    console.log('Server running on Port' + port);
})

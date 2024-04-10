import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static("public"))

app.use(bodyParser.urlencoded({ extended: true }));

// Data store
let posts = [];

// Routes
app.get("/", (req, res) => {
  res.render("index.ejs", { posts: posts });
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  posts.push({ id: posts.length + 1, title, content });
  res.redirect("/");
});

app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  res.render("edit", { post: post });
});

app.post("/posts/:id/update", (req, res) => {
  const { title, content } = req.body;
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));
  posts[index] = { ...posts[index], title, content };
  res.redirect("/");
});

app.post("/posts/:id/delete", (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Blog app listening at http://localhost:${port}`);
});

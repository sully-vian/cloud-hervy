# Notes

## Routing

`routes` folder with files for each "route category" (users...)

```ts
// routes/users.ts
const express = require("express");
const router = express.Router();

router.get("/new" (res, req) => {
    // ...
});

module.exports = router;
```

```ts
// app.ts
const usersRoutes = require("./routes/users");
app.use("/users", usersRoutes);
```

Why not make a `posts` router for the posts routes ?

Add a `delete` route for the files

---

You can chain routes with the same path

```ts
router.route("/new")
    .get((req, res) => {
        // ...
    })
    .post((req, res) => {
        // ...
    });
```

---

run whenever a request with an id parameter is made

`param` is a middleware, it runs after the route is matched and before the route handler is called

`next` is a function that calls the next middleware in the stack

```ts
const users = [{ name: "John" }, { name: "Jane" }];
router.param("id", (req, res, next, id) => {
    req.user = users[id];
    next(); // proceed to the next middleware or route handler
});
```

---

can use a function as middleware for all routes that are below the `use` call

```ts
app.use(logger);
function logger(req, res, next) {
    console.log(req.originalUrl);
    next();
}
```

to use a middleware for one route only, use it as a second argument in the route method

```ts
router.get("/new", logger1, logger2, (req, res) => {
    // ...
});
```

## Rendering static files

`express.static("public")` is a middleware that serves static files from the `public` folder

## Parsing form and JSON data sent to the server

to read the `body` property of the request object, you need to use the `express.urlencoded` middleware

```ts
app.use(express.urlencoded({ extended: true }));

```

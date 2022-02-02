
// Switch to new db "blogger"
use blogger

// Create articles and insert one
db.articles.insert({
    _id: 0,
    author: "Ryan Y",
    author_email: "rdyg@pm.me",
    date: new Date("2008-01-21T20:32:18Z"),
    text: "Simplicity is key. So this article has no content."
})

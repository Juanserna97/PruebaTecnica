const server = require("./server");
const mongoose = require("./database/database");

const port = process.env.PORT || 3000;

const startServer = () => {
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
};

startServer();

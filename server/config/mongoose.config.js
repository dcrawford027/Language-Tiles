const mongoose = require('mongoose');
const db_name = "TilesTest_db"; // Name of database
// The grave marks allow you to insert variable names into strings like below
mongoose.connect(`mongodb://localhost/${db_name}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log(`Established a connection to the database ${db_name}`))
    .catch(err => console.log(`Something went wrong when connecting to the database ${db_name}`, err));

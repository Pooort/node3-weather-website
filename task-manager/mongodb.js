//const mongodb = require('mongodb')
//const MongoClient = mongodb.MongoClient
//const ObjectID = mongodb.ObjectID

const { MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database!')
    }

    const db = client.db(databaseName)

    db.collection('tasks').deleteOne({
        description: 27
    }).then((result) => {
        console.log(result)
    }).catch(((error) => {
        console.log(error)
    }))

    /* db.collection('tasks').findOne().toArray ((error, tasks) => {
        console.log(tasks)
    })

    db.collection('users').find({age: 27}).count ((error, count) => {
        console.log(count)
    }) */

    /*db.collection('users').insertOne({
        _id: id,
        name: 'Vikram',
        age: 2
    }, (error, result) => {
        if (error){
            return console.log('Unable to insert user')
        }
        console.log(result.ops)
    })

    /* db.collection('users').insertMany([
        {
            name: 'Jen',
            age: 28
        },
        {
            name: 'Gunter',
            age: 27
        }
    ], (error, result) => {
        if (error){
            return console.log('Unable to insert users')
        }

        console.log(result.ops)
    }) 

    db.collection('tasks').insertMany([
        {
            description: 'Clean the house',
            completed: true
        },
        {
            description: 'Renew inspection',
            completed: false
        },
        {
            description: 'Pot plants',
            completed: false
        }
    ], (error, result) => {
        if (error) {
            return console.log('Unable to insert tasks.')
        }
        console.log(result.ops)
    })*/
})
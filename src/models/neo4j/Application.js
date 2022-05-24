const neo4jDriver = require('../../database/neo4jConfig');

const findAll = async (email, limit, offset) => {
    const session = neo4jDriver.session({database: 'neo4j'});
    const applications = [];
    try {
        const result = await session.readTransaction(tx =>
            tx.run(`MATCH (application:Application) WHERE application.email CONTAINS '${email}' return application  skip ${offset} limit ${limit}`)
        )
        for (let record of result.records) {
            applications.push(record._fields[0].properties);
        }
        return applications;
    } finally {
        await session.close();
    }
}

// const findById = async (id) =>{
//     const result = await session.run(`MATCH (u:User {_id : '${id}'} ) return u limit 1`)
//     return result.records[0].get('u').properties
// }
//
// const create = async (user) =>{
//     const unique_id = nanoid(8)
//     await session.run(`CREATE (u:User {_id : '${unique_id}', name: '${user.name}', email: '${user.email}', password: '${user.password}'} ) return u`)
//     return await findById(unique_id)
// }
//
// const findByIdAndUpdate = async (id, user) =>{
//     const result = await session.run(`MATCH (u:User {_id : '${id}'}) SET u.name= '${user.name}', u.email= '${user.email}', u.password= '${user.password}' return u`)
//     return result.records[0].get('u').properties
// }
//
// const findByIdAndDelete = async (id) =>{
//     await session.run(`MATCH (u:User {_id : '${id}'}) DELETE u`)
//     return await findAll()
// }

module.exports = {
    findAll,
    // findById,
    // create,
    // findByIdAndUpdate,
    // findByIdAndDelete
}


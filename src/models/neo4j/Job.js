const neo4jDriver = require('../../database/neo4jConfig');

const findAll = async (limit, offset) => {
    const session = neo4jDriver.session({database: 'neo4j'});
    const jobs = [];
    try {
        const { records } = await session.readTransaction(tx =>
            tx.run(`MATCH (j:Job)-[:HAS_BENEFIT]->(jb:JobBenefit) return j,jb skip ${offset} limit ${limit}`)
        )
        console.log('================================')
        for (let record of records) {
            const result = {job: record._fields[0].properties, benefits: [record._fields[1].properties]}
            console.log(result)
            jobs.push(result);
        }
        return jobs;
    } catch(error) {
        console.log(error)
    }
     finally {
        await session.close();
    }
}

// const findById = async (id) =>{
//     const result = await session.run(`MATCH (u:User {_id : '${id}'} ) return u limit 1`)
//     return result.records[0].get('u').properties
// }
//
//
// const create = async (application) =>{
//     const session = neo4jDriver.session({database: 'neo4j'});
//     try {
//         const result = await session.readTransaction(tx => {
//             const query =
//                 `MATCH (j:Job) WHERE id(j) = ${Number(application.job_id)}
//                  MATCH (u:User) WHERE id(u) = ${Number(application.user_id)}
//                  CREATE (a:Application { resume: "${application.resume}", email: "${application.email}",
//                   fullName: "${application.full_name}", linkedinUrl: "${application.linkedin_url}",
//                    phoneNUmber: "${application.phone_number}" }),
//                  (u)-[:SUBMITTED]->(a), (j)-[:HAS_APPLICATION]->(a) RETURN a`;
//             tx.run(query);
//         });
//         return 'Saved successfully.';
//     } catch (error) {
//         return 'Something went wrong.';
//     } finally {
//         await session.close();
//     }
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


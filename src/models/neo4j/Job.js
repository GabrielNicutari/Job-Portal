const neo4jDriver = require('../../database/neo4jConfig');

const findAll = async (limit, offset) => {
    const session = neo4jDriver.session({database: 'neo4j'});
    const jobs = [];
    try {
        const { records } = await session.readTransaction(tx =>
            tx.run(`MATCH (j:Job) RETURN j SKIP ${offset} LIMIT ${limit}`)
        );

        for (let jobRecord of records) {
            const jobId = jobRecord._fields[0].properties.jobId.low;
            const { records } = await session.readTransaction(tx => 
                tx.run(`MATCH (j:Job { jobId: ${jobId} })-[:HAS_BENEFIT]-> (jb:JobBenefit) return jb`)
            );
            let jobBenefits = [];
            for(let benefitRecord of records) {
                jobBenefits.push(benefitRecord._fields[0].properties);
            }
            const job = jobRecord._fields[0].properties;
            jobs.push({job: job, benefits: jobBenefits})
        }
        return jobs;
    } catch(error) {
        console.log(error)
    }
     finally {
        await session.close();
    }
};

const findOne = async (jobId) => {
    const session = neo4jDriver.session({database: 'neo4j'});
    try {
        const jobRecords = await session.readTransaction(tx =>
            tx.run(`MATCH (j:Job { jobId:${jobId} }) RETURN j`)
        );
        const job = jobRecords.records[0]._fields[0].properties;
        const benefitsRecords = await session.readTransaction(tx =>
            tx.run(`MATCH (j:Job { jobId:${jobId} })-[:HAS_BENEFIT]->(jb:JobBenefit) return jb`)
        );
        benefits = [];
        for (benefit of benefitsRecords.records) {
            benefits.push(benefit._fields[0].properties);
        }
        return {job: job, benefits: benefits};
    } catch(error) {
        console.log(error.message)
        return error.message;
    }
     finally {
        await session.close();
    }
};

const patchOne = async () => {
    
};

const create = async () => {
    
};


const deleteOne = async (jobId) => {
    const session = neo4jDriver.session({database: 'neo4j'});
    try {
        await session.readTransaction(tx =>
            tx.run(`MATCH (j:Job { jobId:${jobId} }) DETACH DELETE j`)
        );
    } catch(error) {
        console.log(error.message)
    }
     finally {
        await session.close();
    }
};

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
    deleteOne,
    findOne,
    // findById,
    // create,
    // findByIdAndUpdate,
    // findByIdAndDelete
}


const neo4jDriver = require('../../database/neo4jConfig');
const bcrypt = require('bcrypt');
const cryptPassword = require('../../utils/cryptPassword').cryptSync;

const register = async (user) => {
  const session = neo4jDriver.session({ database: 'neo4j' });

  try {
    const password = cryptPassword(user.password);

    const query = `CREATE (u:User { email: "${user.email}", password: "${password}", username: "${user.username}",role: "${user.role}" })
                  RETURN u`;

    return await session.run(query);
  } catch (error) {
    console.log(error);
    return 'Something went wrong.';
  } finally {
    await session.close();
  }
};

const login = async (user) => {
  const session = neo4jDriver.session({ database: 'neo4j' });

  try {
    const query = `MATCH (u:User) WHERE u.email = '${user.email}' RETURN u`;
    return await session.run(query);
  } catch (error) {
    console.log(error);
    return 'Something went wrong';
  } finally {
    await session.close();
  }
};

const findById = async (id) => {
  const session = neo4jDriver.session({ database: 'neo4j' });

  try {
    const query = `MATCH (u:User) WHERE ID(u) = ${id} RETURN u`;
    return await session.run(query);
  } catch (error) {
    console.log(error);
    return 'Something went wrong';
  } finally {
    await session.close();
  }
};

const comparePassword = (candidatePassword, userPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(candidatePassword, userPassword, (err, isMatch) => {
      if (err) {
        return reject(err);
      }
      if (!isMatch) {
        return reject(false);
      }

      resolve(true);
    });
  });
};

module.exports = {
  register,
  login,
  comparePassword,
  findById
};

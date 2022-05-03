const getUsers = async (User) => {
    const users = await User.findAll();
    for (let user of users) {
        console.log(user)
    }
}

module.exports = getUsers;

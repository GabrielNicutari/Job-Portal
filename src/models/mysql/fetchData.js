const getApplications = async (Application) => {
    const applications = await Application.findAll();
    for (let app of applications) {
        console.log(app.dataValues)
    }
}

module.exports = getApplications;

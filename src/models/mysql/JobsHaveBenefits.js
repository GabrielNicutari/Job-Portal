const JobsHaveBenefits = (sequelize) => {
  // sequelize will automatically generate the composite key based on the foreign keys which are passed in the association
  return sequelize.define('jobs-have-benefits', {},
  { timestamps: false }
  );
};
module.exports = JobsHaveBenefits;
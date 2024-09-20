module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      { name: 'She-Talks', createdAt: new Date(), updatedAt: new Date() },
      { name: 'She-Gath', createdAt: new Date(), updatedAt: new Date() },
      { name: 'She-Class', createdAt: new Date(), updatedAt: new Date() },
      { name: 'She-Sport', createdAt: new Date(), updatedAt: new Date() },
      { name: 'She-Share', createdAt: new Date(), updatedAt: new Date() },
    ], {});

    await queryInterface.bulkInsert('Subcategories', [
      { name: 'membership', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'non membership', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'member & non member', categoryId: 1, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Business', categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Non business', categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Paid', categoryId: 2, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Paid', categoryId: 4, createdAt: new Date(), updatedAt: new Date() },
      { name: 'Free', categoryId: 5, createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Subcategories', null, {});
  }
};

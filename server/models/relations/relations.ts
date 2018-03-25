const Relations = (model) => {
    model.Author.hasMany(model.Post, { foreingKey: 'authorId' });
    model.Post.belongsTo(model.Author, { foreingKey: 'authorId' });
}

module.exports = Relations;
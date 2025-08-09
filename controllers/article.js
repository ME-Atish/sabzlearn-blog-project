const { default: slugify } = require("slugify");
const { Article, Tag } = require("../db");

exports.create = async (req, res, next) => {
  let { title, content, tags } = req.body;

  let slug = slugify(title, { lower: true });
  const copyOfSlug = slug;

  const authorId = req.user.id;
  tags = Array.isArray(tags) ? tags : [tags];

  tags = tags.map((tag) => {
    return Tag.findOrCreate({
      where: {
        title: tag.trim(),
      },
    }).then(([tagInstance]) => tagInstance);
  });

  const tagInstance = await Promise.all(tags);

  const coverPath = `image/covers/${req.file?.filename}`;
  let article;
  let i = 1;
  while (!article) {
    try {
      article = await Article.create({
        title,
        content,
        slug,
        author_id: authorId,
        cover: coverPath,
      });

      await article.addTags(tagInstance);

      return res.status(201).json({
        ...article.dataValues,
        tags: tagInstance.map((tag) => tag.title),
      });
    } catch (err) {
      if (err.original.code === "ER_DUP_ENTRY") {
        slug = `${copyOfSlug}-${i++}`;
      }
    }
  }
};

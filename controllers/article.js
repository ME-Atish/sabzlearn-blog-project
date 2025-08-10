const { default: slugify } = require("slugify");
const { Article, Tag, User } = require("../db");

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

exports.findBySlug = async (req, res, next) => {
  try {
    const article = await Article.findOne({
      where: {
        slug: req.params.slug,
      },

      attributes: {
        exclude: ["author_id"],
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
          as: "author",
        },
        {
          model: Tag,
          attributes: ["title"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!article.dataValues) {
      return res.status(404).json({ message: "Page not found" });
    }

    const tags = article.dataValues.tags.map((tag) => tag.title);

    return res.status(200).json(article.dataValues, tags);
  } catch (error) {
    if (error) {
      return res.status(500).json(error);
    }
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const article = await Article.findByPk(id);

    if (!article?.dataValues) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (!article?.dataValues.author_id === req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await article.destroy();

    res.status(200).json({ message: "Article removed successfully" });
  } catch (error) {
    if (error) {
      return res.status(500).json({ message: error });
    }
  }
};

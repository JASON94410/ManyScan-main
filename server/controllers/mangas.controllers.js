const mangaAPI = require("../mangas-api");
const favoritesMangas = require("../prisma/favoritesMangas");

module.exports.oneMangaByTitle = async (req, res) => {
  const searchManga = req.query.title;
  const results = await mangaAPI.searchByTitle(searchManga);

  return res.json(results);
};

module.exports.allMangas = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Convertit 'page' en nombre

  try {
    const results = await mangaAPI.getAllMangas(page);
    return res.json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Oops, something went wrong" });
  }
};

module.exports.getFavoriteMangas = async (req, res) => {
  try {
    const favoriteMangas = await favoritesMangas.getFavoriteMangas();
    const results = await mangaAPI.getFavorites(favoriteMangas);

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Oops, something went wrong" });
  }
};

module.exports.addFavoriteMangas = async (req, res) => {
  const mangaId = req.body.mangaId;

  try {
    const favoriteManga = await favoritesMangas.saveFavoriteManga(mangaId);
    return res.status(201).json(favoriteManga);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Oops, something went wrong" });
  }
};

module.exports.deleteFavoriteMangas = (req, res) => {
  const mangaId = req.body.mangaId;

  try {
    const deletedFavoriteManga = favoritesMangas.deleteFavoriteManga(mangaId);
    return res.status(200).json(deletedFavoriteManga);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Oops, something went wrong" });
  }
};

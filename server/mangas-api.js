const fetch = require("node-fetch");
const { saveDataToFile, loadDataFromFile } = require("./fileDataManager");

//Récupération de la cover
const getCover = async (manga) => {
  const mangaId = await manga.id;
  const fileName = await manga.relationships.find(
    (relationship) => relationship.type === "cover_art"
  ).attributes.fileName;
  const coverUrl = `https://uploads.mangadex.org/covers/${mangaId}/${fileName}`;
  return coverUrl;
};

// Récupération du rating
const getStatistics = async (manga) => {
  const mangaId = await manga.id;
  const fetchStatistics = await fetch(
    `https://api.mangadex.org/statistics/manga/${mangaId}`
  );
  const data = await fetchStatistics.json();
  const rating = await data.statistics[manga.id].rating.average;
  const numberOfVotes = await data.statistics[manga.id].rating.distribution;

  const totalVotes = Object.values(numberOfVotes).reduce(
    (sum, value) => sum + value,
    0
  );

  const statistics = {
    rating: rating,
    numberOfVotes: totalVotes,
  };
  return statistics;
};

// Retourne un array de 20 mangas max
module.exports.searchByTitle = async (title) => {
  const baseUrl = new URL("https://api.mangadex.org/manga");

  if (!title) {
    throw new Error("Title is not specified");
  }

  const params = {
    title: title.toString(),
    limit: 20,
  };

  baseUrl.search = new URLSearchParams(params).toString();

  try {
    const response = await fetch(url);
    const resultsJSON = await response.json();

    return resultsJSON;
  } catch (error) {
    console.error(error);
  }
};

//Retourne un array de 20 mangas
//L'offset permet un affichage 20 par 20 en spécifiant un numéro de page dans la requête

module.exports.getAllMangas = async (page = 1) => {
  const limit = 20; // Limite de 20 mangas par page

  // Tentative de lecture des données à partir d'un fichier local
  try {
    const mangasFromFile = await loadDataFromFile("./data/mangasData.json");
    const startIndex = (page - 1) * limit; // Calcul de l'index de départ pour la page

    // Si les données sont trouvées dans le fichier, appliquer la pagination ici
    if (mangasFromFile && mangasFromFile.length > 0) {
      const paginatedData = mangasFromFile.slice(
        startIndex,
        startIndex + limit
      );
      return paginatedData; // Retourner les données paginées
    }
  } catch (error) {
    console.error("Error reading from file, fetching from API:", error);
  }

  // Si la lecture du fichier échoue, aller chercher les données via l'API MangaDex
  const baseUrl = new URL("https://api.mangadex.org/manga");
  const offset = (page - 1) * limit; // Calcul de l'offset basé sur la page actuelle
  const params = {
    "contentRating[]": "safe",
    "includes[]": ["cover_art", "author"],
    "availableTranslatedLanguage[]": "fr",
    limit: limit, // Utilisation de la limite définie
    offset: offset, // Utilisation de l'offset calculé
  };

  // Ajout des paramètres à l'URL
  Object.keys(params).forEach((key) => {
    if (Array.isArray(params[key])) {
      params[key].forEach((value) => baseUrl.searchParams.append(key, value));
    } else {
      baseUrl.searchParams.append(key, params[key]);
    }
  });

  // Exécution de la requête à l'API
  try {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Traitement des données reçues de l'API
    const mangasPromises = data.data.map(async (manga) => {
      const coverURL = await getCover(manga);
      const statistics = await getStatistics(manga);

      return {
        id: manga.id,
        title: manga.attributes.title.en,
        description: manga.attributes.description.en,
        type: manga.attributes.publicationDemographic,
        status: manga.attributes.status,
        year: manga.attributes.year,
        createAt: manga.attributes.createdAt,
        updatedAt: manga.attributes.updatedAt,
        language: manga.attributes.availableTranslatedLanguages.join(" "),
        lastChapter: manga.attributes.latestUploadedChapter,
        statistics: statistics,
        cover: coverURL,
        authorId: manga.relationships.find(
          (relationship) => relationship.type === "author"
        ).id,
        authorName: manga.relationships.find(
          (relationship) => relationship.type === "author"
        ).attributes.name,
      };
    });
    const mangas = await Promise.all(mangasPromises);
    saveDataToFile(mangas, "./data/mangaData.json").catch((err) => {
      console.error("Error saving data to file:", err);
    });

    return mangas; // Retour des données traitées
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

module.exports.getFavorites = async (favorites) => {
  try {
    const favoriteMangasPromises = favorites.map(async (favorite) => {
      const response = await fetch(
        `https://api.mangadex.org/manga/${favorite.mangaId}?includes[]=cover_art&includes[]=author`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const manga = data.data;

      const coverURL = await getCover(manga);
      const statistics = await getStatistics(manga);

      return {
        id: manga.id,
        title: manga.attributes.title.en,
        description: manga.attributes.description.en,
        type: manga.attributes.publicationDemographic,
        status: manga.attributes.status,
        year: manga.attributes.year,
        createAt: manga.attributes.createdAt,
        updatedAt: manga.attributes.updatedAt,
        language: manga.attributes.availableTranslatedLanguages.join(" "),
        lastChapter: manga.attributes.latestUploadedChapter,
        statistics: statistics,
        cover: coverURL,
        authorId: manga.relationships.find(
          (relationship) => relationship.type === "author"
        ).id,
        authorName: manga.relationships.find(
          (relationship) => relationship.type === "author"
        ).attributes.name,
      };
    });

    return await Promise.all(favoriteMangasPromises);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

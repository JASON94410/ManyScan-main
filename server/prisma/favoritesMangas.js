const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports.getFavoriteMangas = async () => {
  try {
    const favoriteMangas = await prisma.favoriteManga.findMany();

    return favoriteMangas
  } catch (error) {
    console.error('Error getting favorite mangas:', error);
  } finally {
    await prisma.$disconnect();
  }
};

module.exports.saveFavoriteManga = async (mangaId) => {
  try {
    const newFavoriteManga = await prisma.favoriteManga.create({
      data: {
        mangaId: mangaId,
      },
    });
    console.log('Favorite manga saved:', newFavoriteManga);
  } catch (error) {
    console.error('Error saving favorite manga:', error);
  } finally {
    await prisma.$disconnect();
  }
}

module.exports.deleteFavoriteManga = async (mangaId) => {
    try {
        const deletedFavoriteManga = await prisma.favoriteManga.delete({
            where: {
                mangaId: mangaId,
            },
        });
        console.log('Favorite manga deleted:', deletedFavoriteManga);
    } catch (error) {
        console.error('Error deleting favorite manga:', error);
    } finally {
        await prisma.$disconnect();
    }
}


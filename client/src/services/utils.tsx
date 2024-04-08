export const statusConverter = (status: string) => {
    switch (status) {
        case 'ongoing':
            return 'En cours';
        case 'completed':
            return 'Terminé';
        case 'hiatus':
            return 'En pause';
        case 'cancelled':
            return 'Annulé';
        default:
            return 'Inconnu';
    }
};
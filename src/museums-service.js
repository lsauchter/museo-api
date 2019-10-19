const MuseumsService = {
    getMuseums(knex, lat1, lat2, lon1, lon2) {
        return knex('museums')
            .select('*')
            .whereBetween('latitude', [lat1, lat2])
            .whereBetween('longitude', [lon1, lon2])
    }
}

module.exports = MuseumsService
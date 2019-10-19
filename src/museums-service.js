const MuseumsService = {
    getMuseums(knex, lat1, lat2, lon1, lon2) {
        return knex('museums')
            .select('*')
            .whereBetween('LATITUDE', [lat1, lat2])
            .andwhereBetween('LONGITUDE', [lon1, lon2])
    }
}
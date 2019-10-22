const knex = require('knex')
const app = require('../src/app')
const { makeMuseumsArray, makeFullMuseumsArray, makeMaliciousMuseum } = require('./fixtures')

describe('Museums endpoints', () => {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL
        })
        app.set('db1', db)
        app.set('db2', db)
        app.set('db3', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db.raw('TRUNCATE museums RESTART IDENTITY CASCADE'))

    afterEach('cleanup', () => db.raw('TRUNCATE museums RESTART IDENTITY CASCADE'))

    describe('GET /api/museums', () => {
        context('Given no museums', () => {
            it('responds 200 and with empty list', () => {
                return supertest(app)
                    .get('/api/museums?longitude=-73.97812&longitude=-72.97812&latitude=40.65001&latitude=40.95001')
                    .expect(200, [])
            })
        })

        context('Given there are museums in the database', () => {
            const testMuseums = makeMuseumsArray();
            beforeEach('insert museums', () => {
                return db
                    .into('museums')
                    .insert(testMuseums)
                })
           

            it('GET /api/museums responds 200 and with all museums', () => {
                const allMuseums = makeFullMuseumsArray()
                return supertest(app)
                    .get('/api/museums?longitude=-73.97812&longitude=-72.97812&latitude=40.65001&latitude=40.95001')
                    .expect(200)
                    .expect(res => {
                        expect(res.body.length).to.equal(allMuseums.length)
                    })
            })
        })

        context('Given XSS attack museum', () => {
            const {maliciousMuseum, expectedMuseum} = makeMaliciousMuseum()

            beforeEach('insert malicious museum', () => {
                return db
                    .into('museums')
                    .insert(maliciousMuseum)
                })

            it('removes XSS attack content', () => {
                return supertest(app)
                    .get('/api/museums?longitude=-73.97812&longitude=-72.97812&latitude=40.65001&latitude=40.95001')
                    .expect(200)
                    .expect(res => {
                        expect(res.body[0].commonname).to.eql(expectedMuseum.commonname)
                        expect(res.body[0].gstreet).to.eql(expectedMuseum.gstreet)
                    })
            })
        })
    })
})
describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/');
    });
});

describe('US -> test api CANADA coordinates', () => {
    it('Get api results with canada coordinates', () => {
        cy.request('GET', 'http://localhost:3000/api/places/-73.582&45.511&100').as('elements')
        cy.get('@elements').should((response)=>{
            expect(response.body['0']).to.have.property('name', 'Percival Molson Stadium')
            expect(response.body['0']['address']).to.have.property('country', 'CA')
        })
    })
})
/*
describe('US -> test api CALAIS coordinates', () => {
    it('Get api results with canada coordinates', () => {
        cy.request('GET', 'http://localhost:3000/api/places/51.033&2.358&100').as('elements')
        cy.get('@elements').should((response)=>{
            expect(response.body['0']).to.have.property('name', 'Percival Molson Stadium')
            expect(response.body['0']['address']).to.have.property('country', 'CA')
        })
    })
})
*/
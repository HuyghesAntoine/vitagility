/* Test home page */
describe('The Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/');
    });
});

/* Tests on our own API */
describe('US -> test api CANADA coordinates', () => {
    it('Get api results with canada coordinates', () => {
        cy.visit('/');
        cy.request('GET', 'http://localhost:3000/api/places/-73.582&45.511&100').as('elements')
        cy.get('@elements').should((response)=>{
            expect(response.body['0']).to.have.property('name', 'Percival Molson Stadium')
            expect(response.body['0']['address']).to.have.property('country', 'CA')
        })
    })
})
describe('US -> test api sport id to name', () => {
    it('Get api results for sports id', () => {
        cy.request('GET', 'http://localhost:3000/api/places/51.033&26.358&100').as('elements')
        cy.get('@elements').should((response)=>{
            expect(response.body['0']['sport']).to.have.property('id', 81)
            expect(response.body['0']['sport']).to.have.property('name', 'Soccer')
        })
    })
})


describe('US -> test gmap autocomplete', () => {
    it('Get full adress with 0 details', () => {
        cy.visit('/');
        cy.get('#address').clear().type('calais')
        cy.get('#search', {timeout:2000}).click()
        cy.get('#address').should('have.value',  'Calais, France')
    })
})

describe('US -> test main list length', () => {
    it('Gtest if mainlist == 10 items', () => {    
        expect('#mainList').to.have.lengthOf(9)
    })
})




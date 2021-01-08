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
        cy.request(
            'GET',
            'http://localhost:3000/api/places/-73.582&45.511&100'
        ).as('elements');
        cy.get('@elements').should((response) => {
            expect(response.body['1']).to.have.property(
                'name',
                'McConnell Arena'
            );
            expect(response.body['1']['address']).to.have.property(
                'country',
                'CA'
            );
        });
    });
});
describe('US -> test api sport id to name', () => {
    it('Get api results for sports id', () => {
        cy.request(
            'GET',
            'http://localhost:3000/api/places/51.033&26.358&100'
        ).as('elements');
        cy.get('@elements').should((response) => {
            expect(response.body['1']['sport']).to.have.property('id', 81);
            expect(response.body['1']['sport']).to.have.property(
                'name',
                'Soccer'
            );
        });
    });
});

/* Tests on the home page */

describe('US -> test gmap autocomplete', () => {
    it('Get full adress with 0 details', () => {
        cy.visit('/');
        cy.get('#address').clear().type('calais');
        cy.get('#search').click();
        cy.get('#address').should('have.value', 'Calais, France');
    });
});
describe('US -> test main list length', () => {
    it('Gtest if mainlist == 10 items', () => {
        expect('#mainList').to.have.lengthOf(9);
    });
});
/*
describe('US -> Adress and sports of places', () => {
    it('Adress and sport of the 2nd places in calais', () => {
        cy.visit('/');
        cy.get('#address').clear().type('calais');
        cy.get('#search').click();
        cy.get('#ff8b5d2a-d885-4b4d-8807-1c0256ef1daf', {
            timeout: 50000,
        }).click();

        cy.get(
            '#ff8b5d2a-d885-4b4d-8807-1c0256ef1daf > .d-flex > .mb-1'
        ).contains('Salle Quinet');
        // cy.get('.card-text').contains("nom : Salle Quinet")

        cy.get(
            '#ff8b5d2a-d885-4b4d-8807-1c0256ef1daf > .d-flex > .mb-1 > .vtmn-typo_text-3'
        ).contains('(Volleyball)');
        //  cy.get('.card-text').contains("sports : Volleyball")
    });
});*/

describe('US -> select by sport', () => {
    it('check if the sport is selected', () => {
        // cy.get('.sidebar').scrollTo('top')
        cy.visit('/');
        cy.get('#address').clear().type('calais');
        cy.get('#search').click();

        cy.get('#4446580a-22ae-4a69-a7ef-b50527fee02f', { timeout: 10000 });
        cy.get('#selectSports').select('78');

        cy.get('#39ca0250-be07-4006-86fb-2f2777c33ebb > .d-flex > .mb-1', {
            timeout: 10000,
        }).contains('City-Stade');
        // cy.get('.card-text').contains("nom : Salle Quinet")

        cy.get(
            '#39ca0250-be07-4006-86fb-2f2777c33ebb > .d-flex > .mb-1 > .vtmn-typo_text-3'
        ).contains('(Basketball)');
    });
});

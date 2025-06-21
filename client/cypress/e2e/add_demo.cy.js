/// <reference types="cypress" />

describe('Ajout d\'une démo audio', () => {
  beforeEach(() => {
    cy.visit('/add-demo');
  });

  // Title, description and section
  it('remplit le formulaire et ajoute une démo', () => {
    cy.get('#titleInput').type('Titre de ma démo');
    cy.get('#descriptionInput').type('Voici la description de ma démo.');
    cy.get('#sectionSelect').then($select => {
      if ($select.find('option').length > 1) {
        cy.get('#sectionSelect').select($select.find('option').eq(1).val());
      }
    });

    // Upload audio and image (from fixtures)
    cy.get('#audioFile').attachFile('testaudio.mp3');
    cy.get('#imageFile').attachFile('testimage.png');

    cy.get('button[type=submit]').click();

    // Test redirection
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});

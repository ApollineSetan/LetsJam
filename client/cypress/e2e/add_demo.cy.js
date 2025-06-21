/// <reference types="cypress" />

describe('Ajout d\'une démo audio', () => {
  beforeEach(() => {
    // Adapter l'URL selon ta route d'ajout
    cy.visit('/add-demo');
  });

  it('remplit le formulaire et ajoute une démo', () => {
    // Remplir le titre
    cy.get('#titleInput').type('Ma super démo');

    // Remplir la description
    cy.get('#descriptionInput').type('Voici la description de ma démo.');

    // Choisir une section si besoin, sinon commenter cette partie
    cy.get('#sectionSelect').then($select => {
      if ($select.find('option').length > 1) {
        // Sélectionne la 2ème option (première option est désactivée)
        cy.get('#sectionSelect').select($select.find('option').eq(1).val());
      }
    });

    // Upload fichier audio (depuis fixtures)
    cy.get('#audioFile').attachFile('testaudio.mp3');

    // Upload image (depuis fixtures)
    cy.get('#imageFile').attachFile('testimage.png');

    // Cliquer sur Valider
    cy.get('button[type=submit]').click();

    // Vérifier redirection ou comportement attendu après soumission
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });
});

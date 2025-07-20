describe('Calculatrice Ultra Vue.js - Navigation et Fonctionnalités', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.clearLocalStorage();
  });

  it('navigue entre les vues simple et avancée', () => {
    cy.contains('Calculatrice simple');
    cy.contains('Calculatrice avancée').click();
    cy.url().should('include', '/avancee');
    cy.get('.expression-input').should('exist');
    cy.contains('Calculatrice simple').click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  });

  it('effectue un calcul simple et le synchronise dans l\'historique', () => {
    cy.get('button').contains('2').click();
    cy.get('button').contains('+').click();
    cy.get('button').contains('3').click();
    cy.get('button.equals').click();
    cy.get('.current-operand').should('contain', '5');
    cy.get('.history li').first().should('contain', '2 + 5 = 5');
  });

  it('effectue un calcul avancé et le synchronise dans l\'historique', () => {
    cy.contains('Calculatrice avancée').click();
    cy.get('.expression-input').type('2+3*4-5/2');
    cy.get('button').contains('=').click();
    cy.get('.display.advanced').should('not.contain', 'Erreur');
    cy.get('.history li').first().should('contain', '2+3*4-5/2');
  });

  it('persiste l\'historique après rechargement', () => {
    cy.get('button').contains('7').click();
    cy.get('button').contains('+').click();
    cy.get('button').contains('8').click();
    cy.get('button.equals').click();
    cy.get('.history li').first().should('contain', '7 + 15 = 15');
    cy.reload();
    cy.get('.history li').first().should('contain', '7 + 15 = 15');
  });

  it('affiche une page 404 pour une URL inconnue', () => {
    cy.visit('/inconnue', { failOnStatusCode: false });
    cy.contains('404');
    cy.contains("Oups, cette page n'existe pas.");
  });
}); 
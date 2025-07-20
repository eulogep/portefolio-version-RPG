describe('Accessibilité Calculatrice Ultra Vue.js', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('skip-link permet d’aller au contenu principal', () => {
    cy.get('.skip-link').focus().type('{enter}');
    cy.get('#main-content').should('be.focused');
  });

  it('tous les boutons principaux sont accessibles au clavier', () => {
    cy.get('button').each(($btn) => {
      cy.wrap($btn).focus().should('have.css', 'outline-style', 'solid');
    });
  });

  it('tous les boutons ont un aria-label', () => {
    cy.get('button').each(($btn) => {
      cy.wrap($btn).should('have.attr', 'aria-label');
    });
  });

  it('le message d’erreur est bien aria-live', () => {
    cy.contains('Calculatrice avancée').click();
    cy.get('.expression-input').type('sqrt(-1)');
    cy.get('.error-msg').should('have.attr', 'aria-live', 'assertive');
    cy.get('.error-msg').should('be.visible');
  });
}); 
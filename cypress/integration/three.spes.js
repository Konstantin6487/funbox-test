describe('Third Test', () => {
  it('Focus on the input', () => {
    cy.visit('/');
    cy.focused().should('have.attr', 'data-test', 'waypoints');
  });
});

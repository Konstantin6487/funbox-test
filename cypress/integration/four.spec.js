describe('Four Test', () => {
  it('Accepts input', () => {
    const text = 'New location';
    cy.visit('/');
    cy.get('input[data-test="waypoints"]').type(text).should('have.value', text);
  });
});

describe('Five Tests', () => {
  context('Locations', () => {
    it('Adds a new todo', () => {
      cy.visit('/');
      cy.get('input[data-test="waypoints"]').type('Saratov').type('{enter}');
    });
  });
});

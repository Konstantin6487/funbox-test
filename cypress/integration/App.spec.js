describe('First test', () => {
  it('is working', () => {
    expect(true).to.equal(true);
  });
});

describe('Second test', () => {
  it('Visit the app', () => {
    cy.visit('/');
  });
});

describe('Third test', () => {
  it('Focus on the input', () => {
    cy.visit('/');
    cy.focused().should('have.attr', 'data-test', 'waypoints');
  });
});

describe('Fourth test', () => {
  it('Accepts input', () => {
    const text = 'New location';
    cy.visit('/');
    cy.get('input[data-test="waypoints"]').type(text).should('have.value', text);
  });
});

describe('Five test', () => {
  context('Locations', () => {
    it('Adds a new location', () => {
      cy.visit('/');
      cy.get('input[data-test="waypoints"]').type('Saratov').type('{enter}');
    });
  });
});

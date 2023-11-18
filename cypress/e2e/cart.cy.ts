describe('E2E test for adding a product to the cart', () => {
  it('Check adding a product to the cart and match', () => {
    cy.visit('http://local.suncase.com:5437/');

    let productTitle;

    cy.get('#catalog')
      .find('[data-test="product-card"]')
      .first()
      .click({ force: true })
      .find('strong')
      .invoke('text')
      .then((text) => {
        console.log('Product title: ' + text);

        productTitle = text.trim();
      });

    cy.get('[data-test="add-to-cart"]').click();
    cy.get('[data-test="close-modal"]').click();

    cy.get('[data-test="open-cart"]').click();

    cy.get('[data-test="cart"] [data-test="product-card"]')
      .should('have.length', 1)
      .invoke('text')
      .should('contain', productTitle); // Check if the text in the cart contains the text of the selected product
  });
});

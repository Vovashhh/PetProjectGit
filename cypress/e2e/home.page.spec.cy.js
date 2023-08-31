describe('template spec', () => {
  it('Open home page', () => {
    cy.visit('/#/')
    cy.get('h1').
    contains('conduit')
  })

  it('should have all parts', () => {
    // Проверяем что мы перешли на страницу 
    cy.get('h1').should('contain.text', 'conduit');
    
    // Проверяем что есть Global Feed 
    cy.contains('a', 'Global Feed').should('be.visible');
    
    // Проверяем что в сайдбаре есть указанный текст
    cy.contains('.sidebar', 'Popular Tags').should('be.visible');
  });

})
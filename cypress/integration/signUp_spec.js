context('When a user tries to sign up', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000')
    })
  
    it('allows user to type', () => {
      cy.get('[data-testid="sign-up-link"]').click()
      cy.get('sign-up-form').should('be.visible')
    })
  })
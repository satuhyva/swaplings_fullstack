import dotenv from 'dotenv'

const configuration = (on, config) => {
  config.env = config.env || {}
  config.env.CLIENT_BASE = process.env.CLIENT_BASE
  return config
}

// const CLIENT = dotenv.config().CLIENT_BASE
const CLIENT = (Cypress.env('CLIENT_BASE')) || 'client'
const CLIENT_BASE_URL = `http://${CLIENT}:3000`


describe('Swaplings app home page', () => {
    // beforeEach(() => {
    //   cy.visit(CLIENT_BASE_URL)
    // })
    it('Cypress tests can be run', () => {
      expect(true).to.equal(true)
    })
  
    it('Home Page can be visited', () => {
      cy.visit(CLIENT_BASE_URL)
      cy.get('[data-cy=home-page]').should('have.text', 'SWAPLINGS')
    })

    it('Backend can be connected', () => {
      cy.visit(`${CLIENT_BASE_URL}/testing-connection-to-backend`)
      cy.wait(1000*10)
      cy.get('[data-cy=server-connection]').should('have.text', 'Connected to server')
      cy.get('[data-cy=db-connection]').should('have.text', 'Connected to database via server')
    })
})
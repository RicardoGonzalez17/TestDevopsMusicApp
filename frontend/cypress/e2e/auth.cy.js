describe('carga y busca que exista el botón de login', () => {
  it('La app carga y busca el botón de login', () => {
    cy.visit('http://localhost:5173')
    cy.get('a')
    .filter((index, el) => {
      const href = el.getAttribute('href')
      return href && href.includes('/login')
    })
    .first()
    .click({force: true})
    }),
  it('busca inputs email, password, coloca datos y da click en el botón y verifca que no tenga opción de ver usuarios', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').type("first@first.com")
    cy.get('input[name="email"]').should('have.value', "first@first.com")

    cy.get('input[name="password"]').type("first")
    cy.get('input[name="password"]').should('have.value', "first")

    cy.get('button[type="submit"]').click()
    
  })
}),

describe('carga y busca que exista el botón de login', () => {
  it('La app carga y busca el botón de login', () => {
    cy.visit('http://localhost:5173')
    cy.get('a')
    .filter((index, el) => {
      const href = el.getAttribute('href')
      return href && href.includes('/login')
    })
    .first()
    .click({force: true})
    }),
  it('busca inputs email, password, coloca datos y da click en el botón y verifca que SI tenga opción de ver usuarios', () => {
    cy.visit('/login')
    cy.get('input[name="email"]').type("test@test.com")
    cy.get('input[name="email"]').should('have.value', "test@test.com")

    cy.get('input[name="password"]').type("test")
    cy.get('input[name="password"]').should('have.value', "test")

    cy.get('button[type="submit"]').click()
    
  })
})
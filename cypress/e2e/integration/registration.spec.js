describe('Registration', () => {
    beforeEach(() => {
      cy.visit('http://localhost:3000/register'); // Adjust the URL to where your registration page is served
    });
  
    it('allows a user to register', () => {
      // Replace the IDs and classes with the correct ones for your input fields
      cy.get('input#email').type('user@example.com');
      cy.get('input#password').type('password');
      cy.get('input#repeat-password').type('password');
      cy.get('input#terms').check();
      cy.get('form').submit();
  
      // Check for a successful registration message
      // Replace with the correct selector for your message
      cy.contains('Registration successful').should('be.visible');
    });
  
    it('shows an error message if the passwords do not match', () => {
      cy.get('input#email').type('user@example.com');
      cy.get('input#password').type('password');
      cy.get('input#repeat-password').type('differentpassword');
      cy.get('input#terms').check();
      cy.get('form').submit();
  
      // Check for the password mismatch error message
      cy.contains('Passwords do not match').should('be.visible');
    });
  });
  
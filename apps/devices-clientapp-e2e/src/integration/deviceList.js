//import { last } from "cypress/types/lodash";

describe("renders the home page", () => {
    beforeEach(() => {
      cy.visit("/");
    });
  
    it("renders correctly", () => {
      cy.get(".container").should("exist");
      cy.intercept("http://localhost:3000/devices").as("deviceList");
      //cy.contains('Add System').click()
      cy.wait("@deviceList").then((interception) => {
        const response = interception.response.body.data;
        expect(response);
      });
    });

    it("user adds device", () => {
      cy.get('#add_system').click();
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(2000)
      cy.get('#system_name').type('ADD-COMPUTER')
      cy.get('#type').select('WINDOWS_SERVER')
      cy.get('#hdd_capacity').type('200')
      cy.get('#submit').click()
       // eslint-disable-next-line cypress/no-unnecessary-waiting
       cy.wait(2000)
       cy.get(".container").contains('ADD-COMPUTER');
    });
  
  });
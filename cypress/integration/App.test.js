describe("Board Wars game", () => {
  before(() => {
    cy.visit("http://127.0.0.1:5500/");
  });

  it("Renders without crashing", () => {
    cy.get("h1").contains("Board Wars");
  });

  describe("The default UI", () => {
    // it("Renders two default todo items", () => {
    //   cy.get(".ToDoItem").should("have.length", 2);
    // });

    it("Has an input field", () => {
      cy.get("input").should("have.length", 2);
    });

    it("Has a submit button", () => {
      cy.get(".submit").should("have.length", 1);
    });
  });

  describe("submitting items", () => {
    it("When the add button is pressed, if the input field is empty, nothing should happen", () => {
      cy.get(".submit").click();
    });

    it("text is visible in inputfield as you type, and displayed on player cards as names", () => {
      cy.get("#namePlayer1")
        .type("Chris")
        .should("have.value", "Chris");

        cy.get("#namePlayer2")
        .type("Sam")
        .should("have.value", "Sam");
      cy.get(".submit").click();

      cy.get("#player1Info").contains("Chris");
      cy.get("#player2Info").contains("Sam");

      cy.get("#nameForm").should('be.not.visible');

    });
  });

});

  // describe("Deleting items", () => {
  //   it("When the delete button is pressed for the first todo item, it removes the entire item", () => {
  //     cy.get(":nth-child(1) > .ToDoItem-Delete").click();
  //   });
  //   it("means that because the first toDoItem was deleted, the first toDoItem should now be buy milk", () => {
  //     cy.get(":nth-child(2) > .ToDoItem").contains("buy milk");
  //   });
  // });

  // describe("Deleting items", () => {
  //   it("When the delete button is pressed for the first todo item, it removes the entire item", () => {
  //     cy.get(":nth-child(1) > .ToDoItem-Delete").click();
  //   });
  //   it("means that because the first toDoItem was deleted, the first toDoItem should now be buy milk", () => {
  //     cy.get(":nth-child(2) > .ToDoItem").contains("buy milk");
  //   });
  // });

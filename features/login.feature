Feature: User Authentication tests

  # Background:
  #   Given User navigates to the website

  @login
  Scenario: Login is successful
    Given User navigates to the website
    And User enter the username as "vira.balinska@hora-services.md"
    And User enter the password as "Vira2025?"
    When User click on the login button
    Then Logo should be visible
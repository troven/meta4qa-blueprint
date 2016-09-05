Feature: Make an Edge Proxy

  @target=google
  Scenario: Build proxy
    Given I am building a proxy
    And I use threat-protection flow
    And I load openapi from swagger.yaml
    And I use webapp-firewall flow
    And I use oauth2 flow
    And I use api-key flow
    And I use simple-authorization flow
    And I use aws-auditing flow
    And I use analytics flow
    And I use target-server flow
    When I build an edge proxy
    Then folder ./build/apiproxy exists


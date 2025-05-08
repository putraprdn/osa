sequenceDiagram
    participant browser
    participant server
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    Note right of browser: The browser sends a POST request to the server with 'Content-Type' as 'application/json' <br/> and with payload '{content: "example", date: "2025-05-08"}'
   
    server-->>browser: Response with status 201 (created)
    deactivate server
    Note left of server: The server responses with code 201 <br/> indicating the POST request made by browser is successful and the data is created

    Note right of browser: The browser executes the callback

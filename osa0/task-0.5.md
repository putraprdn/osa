sequenceDiagram
    participant browser
    participant server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    Note right of browser: The browser requests data to the server
   
    server-->>browser: HTML document
    deactivate server
    Note left of server: The server serves the html page as a response to the browser
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    Note right of browser: The browser renders the HTML file and requests the CSS file as initiated in the HTML
    
    server-->>browser: the css file
    deactivate server
    Note left of server: The server responses by sending the CSS as 'text/css, UTF-8'

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server
    
    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "Example", "date": "2025-05-05" }, ... ]
    deactivate server    

    Note right of browser: The browser executes the callback function that renders the notes 
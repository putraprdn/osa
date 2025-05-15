# Phonebook Backend

This is a simple Express application that serves as a backend for a phonebook. It provides an API to manage and retrieve contact information.

## API Endpoint

The main production URL is available at:

- [https://phonebook-backend-one.vercel.app/api/persons](https://phonebook-backend-one.vercel.app/api/persons) (API)
- [https://phonebook-backend-one.vercel.app](https://phonebook-backend-one.vercel.app) (Web)


### Data Format

The API returns a JSON array of persons, where each person object contains the following fields:

- `name`: The name of the person.
- `number`: The phone number of the person.
- `id`: A unique identifier for the person.

### Example Response

```json
[
  {"name":"Arto Hellas","number":"040-123456","id":"1"},
  {"name":"Ada Lovelace","number":"39-44-5323523","id":"2"},
  {"name":"Dan Abramov","number":"12-43-234345","id":"3"},
  {"name":"Mary Poppendieck","number":"39-23-6423122","id":"4"}
]
```
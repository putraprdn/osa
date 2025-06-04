import { gql } from "@apollo/client";

export const GET_ALL_AUTHORS = gql`
	query {
		allAuthors {
			id
			name
			born
			bookCount
		}
	}
`;

export const GET_ALL_BOOKS = gql`
	query {
		allBooks {
			id
			title
			author
			published
		}
	}
`;

export const ADD_BOOK = gql`
	mutation createBook(
		$title: String!
		$published: Int!
		$author: String!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			published: $published
			author: $author
			genres: $genres
		) {
			id
			title
			author
			published
			genres
		}
	}
`;

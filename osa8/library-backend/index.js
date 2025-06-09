const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

mongoose.set("strictQuery", false);

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

require("dotenv").config();

const MONGO_URI = process.env.MONGO_URI;

mongoose
	.connect(MONGO_URI)
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((error) => {
		console.log("Error connection to MongoDB", error);
	});

let authors = [
	{
		name: "Robert Martin",
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		born: 1952,
	},
	{
		name: "Martin Fowler",
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		born: 1963,
	},
	{
		name: "Fyodor Dostoevsky",
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		born: 1821,
	},
	{
		name: "Joshua Kerievsky", // birthyear not known
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
	},
	{
		name: "Sandi Metz", // birthyear not known
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
	},
];

/*
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
 */

let books = [
	{
		title: "Clean Code",
		published: 2008,
		author: "Robert Martin",
		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring"],
	},
	{
		title: "Agile software development",
		published: 2002,
		author: "Robert Martin",
		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
		genres: ["agile", "patterns", "design"],
	},
	{
		title: "Refactoring, edition 2",
		published: 2018,
		author: "Martin Fowler",
		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring"],
	},
	{
		title: "Refactoring to patterns",
		published: 2008,
		author: "Joshua Kerievsky",
		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring", "patterns"],
	},
	{
		title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
		published: 2012,
		author: "Sandi Metz",
		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
		genres: ["refactoring", "design"],
	},
	{
		title: "Crime and punishment",
		published: 1866,
		author: "Fyodor Dostoevsky",
		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
		genres: ["classic", "crime"],
	},
	{
		title: "Demons",
		published: 1872,
		author: "Fyodor Dostoevsky",
		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
		genres: ["classic", "revolution"],
	},
];

const typeDefs = `
	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

    type Book {
        title: String!
		published: Int!
		author: Author!
		genres: [String!]!
		id: ID!
    }

    type Author {
        name: String!
        id: ID!
        born: Int
        bookCount: Int
    }

    type Query {
        bookCount: Int
        authorCount: Int
        allBooks (author: String, genre: String): [Book]!
        allAuthors: [Author!]!
		me: User
    }

    type Mutation {
        addBook(
            title: String!
            published: Int!
            author: String!
            genres: [String!]!
        ): Book

        editAuthor(
            name: String!
            born: Int!
        ): Author

		createUser(
			username: String!
			favoriteGenre: String!
		): User

		login(
			username: String!
			password: String!
		): Token
    }
`;

const resolvers = {
	Query: {
		bookCount: async () => {
			const totalBooks = await Book.countDocuments();

			return totalBooks;
		},
		authorCount: async () => {
			const totalAuthors = Author.countDocuments();

			return totalAuthors;
		},
		allBooks: async (root, args) => {
			const filter = {};

			if (args.author) {
				const { _id } =
					(await Author.findOne({ name: args.author }).select(
						"_id"
					)) || {};
				if (_id) filter.author = _id;
			}

			if (args.genre) {
				filter.genres = { $in: args.genre };
			}

			return await Book.find(filter).populate({
				path: "author",
				select: "name id born",
			});
		},
		allAuthors: async () => {
			return Author.find({});
		},
		me: (root, args, context) => {
			return context.currentUser;
		},
	},
	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			try {
				if (!currentUser) {
					throw new GraphQLError("not authenticated", {
						extensions: {
							code: "BAD_USER_INPUT",
						},
					});
				}

				let author = await Author.findOne({ name: args.author });
				if (!author) {
					// Create new author
					author = await Author.create({ name: args.author });
				}
				args.author = author;
				console.log(args);
				// return;
				const createBook = new Book(args);

				await createBook.save();
				return createBook;
			} catch (error) {
				console.log(JSON.stringify(error));
				let errorCode = "BAD_USER_INPUT";
				let errorMsg = error.message || "failed to create book";

				if (error.name === "ValidationError") {
					errorCode = error.name;
					errorMsg = error.message;
				}

				throw new GraphQLError(errorMsg, {
					extensions: {
						code: errorCode,
					},
				});
			}
		},
		editAuthor: async (root, args, { currentUser }) => {
			try {
				if (!currentUser) {
					throw new GraphQLError("not authenticated", {
						extensions: {
							code: "BAD_USER_INPUT",
						},
					});
				}

				return Author.findOneAndUpdate(
					{ name: args.name },
					{ born: parseInt(args.born) },
					{ new: true }
				);
			} catch (error) {
				console.log(JSON.stringify(error));
				let errorCode = "BAD_USER_INPUT";
				let errorMsg = error.message || "failed to create book";

				if (error.name === "ValidationError") {
					errorCode = error.name;
					errorMsg = error.message;
				}

				throw new GraphQLError(errorMsg, {
					extensions: {
						code: errorCode,
					},
				});
			}
		},
		createUser: async (root, args) => {
			try {
				const newUser = await User.create({
					username: args.username,
					favoriteGenre: args.favoriteGenre.toLowerCase(),
				});

				return newUser;
			} catch (error) {
				let errorCode = "BAD_USER_INPUT";
				let errorMsg = "failed to create book";

				if (error.name === "ValidationError") {
					errorCode = error.name;
					errorMsg = error.message;
				}

				throw new GraphQLError(errorMsg, {
					extensions: {
						code: errorCode,
					},
				});
			}
		},
		login: async (root, args) => {
			const user = await User.findOne({ username: args.username });
			if (!user || args.password !== "secret") {
				throw new GraphQLError("wrong credentials", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				});
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			};

			return { value: jwt.sign(userForToken, process.env.JWT_SECRET) };
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req, res }) => {
		const auth = req ? req.headers.authorization : null;
		if (auth && auth.startsWith("Bearer ")) {
			const cleanToken = auth.replace("Bearer ", "");

			const decodedToken = jwt.verify(cleanToken, process.env.JWT_SECRET);
			
			const currentUser = await User.findById(decodedToken.id);

			return { currentUser };
		}
	},
}).then(({ url }) => {
	console.log(`Server ready at ${url}`);
});

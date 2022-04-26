const { books, authors } = require('../data/static');
const Author = require('../models/Author');
const Book = require('../models/Book');
const resolvers = {
    // QUERY
    Query: {
        books: async (parent, args, { mongoDataMethods }) => await mongoDataMethods.getAllBooks(),
        book: async (parent, args, { mongoDataMethods }) => await mongoDataMethods.getBookById(args.id),
        authors: async (parent, args, { mongoDataMethods }) => await mongoDataMethods.getAllAuthor(),
        author: async (parent, args, { mongoDataMethods }) => await mongoDataMethods.getAuthorById(args.id)
    },
    Book: {
        author: async (parent, args, { mongoDataMethods }) => {
            console.log(parent)
           return await mongoDataMethods.getAuthorById(parent.authorId)
        }
    },
    Author: {
        books: async (parent, args, { mongoDataMethods }) => {
            return await mongoDataMethods.getAllBooks({ authorId: parent.id })
        }
    },

    // MUTATION
    Mutation: {
        createAuthor: async (parent, args, { mongoDataMethods }) => await mongoDataMethods.createAuthor(args),
        createBook: async (parent, args, { mongoDataMethods }) => await mongoDataMethods.createBook(args)
    }
}

module.exports = resolvers;
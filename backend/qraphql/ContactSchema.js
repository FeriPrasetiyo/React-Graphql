var { buildSchema } = require('graphql');
const { where } = require('sequelize');
var ContactModel = require('../models');

var schema = buildSchema(`
  input ContactInput {
    name: String
    phone: String
  }

  type Contact {
    id: ID!
    name: String
    phone: String
  }

  type Query {
    getContacts:[Contact]
    getContact(id: ID!):Contact
  }

  type Mutation {
    getContacts: [Contact]
    getContact(id:ID!): Contact
    createContact(input: ContactInput): Contact
    updateContact(id: ID!, input: ContactInput): Contact
    deleteContact(id: ID!): Contact
  }
`);

class Contact {
  constructor(id, { name, phone }) {
    this.id = id;
    this.name = name;
    this.phone = phone
  }
}


const root = {
  getContacts: async () => {
    try {
      const contact = await ContactModel.User.findAll()
      return contact
    } catch (err) {
      console.log(err)
    }
  },
  createContact: async ({ input }) => {
    try {
      const contact = await ContactModel.User.create(input)
      return contact
    } catch {
      console.log(err)
    }
  },
  updateContact: async ({ id, input }) => {
    try {
      const contact = await ContactModel.User.update({ name: input.name, phone: input.phone }, {
        where: {
          id
        },
        returning: true,
        plain: true
      })
      return contact[1]
    } catch (err) {
      console.log(err)
    }
  },
  deleteContact: async ({ id }) => {
    try {
      const contact = ContactModel.User.destroy({
        where: {
          id
        }
      })
      return contact
    } catch (err) {
      throw err
    }
  },
};

/*
{
  getTodos{
    _id
    title
    complete
  }
}
mutation {
  createTodo(input: {
    title: "kerja"
  }) {
    _id
    title
  }
}
*/

module.exports = { schema, root }
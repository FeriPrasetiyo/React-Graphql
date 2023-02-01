var { buildSchema } = require('graphql');
var ContactModel = require('../models');
const { Op } = require("sequelize");

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

  type PARAMS {
    rowCount: Int
    totalCount: Int
    page: Int
    pages: Int
    name: String
    phone: String
  }
  
  type RESPONSE_LOAD_DATA {
    success: Boolean
    data: DATA
  }

  type DATA {
    params: PARAMS
    contacts: [Contact]
  }

  type Query {
    hello: String
    load(page: Int! = 1, name: String, phone: String): RESPONSE_LOAD_DATA
  }

  type Mutation {
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
  hello: () => "hello world",
  load: async ({ page, name, phone }, args, context, info) => {
    console.log("🚀 ~ file: resolvers.js:8 ~ load: ~ page", page)
    try {
      let params = {};
      let op = mode === "or" ? Op.or : Op.and;

      const limit = 5;
      const offset = (page - 1) * limit;

      if (name || phone) {
        params[op] = {};
      }

      if (name) {
        params[op]["name"] = {
          [Op.iLike]: `%${name}%`,
        };
      }

      if (phone) {
        params[op]["phone"] = {
          [Op.iLike]: `%${phone}%`,
        };
      }

      const totalCount = await ContactModel.User.count();
      const { count, rows } = await ContactModel.User.findAndCountAll({
        where: params,
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      const pages = Math.ceil(count / limit);

      return ({
        params: {
          rowCount: count,
          totalCount,
          page: Number(page),
          pages,
          name,
          phone,
        },
        contacts: rows,
      });
    } catch (error) {
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

module.exports = { schema, root }
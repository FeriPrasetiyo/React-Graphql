var { buildSchema } = require('graphql');
var { Response } = require("../helpers/util");
var ContactModel = require('../models');
const { Op } = require("sequelize");

var schema = buildSchema(`
  input ContactInput {
    name: String
    phone: String
  }

  type Contact {
    id: Int!
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

  type DATA {
    params: PARAMS
    contacts: [Contact]
  }
  
  type RESPONSE_LOAD_DATA {
    success: Boolean
    data: DATA
  }

  type Query {
    hello: String
    load(page: Int! = 1, name: String, phone: String): RESPONSE_LOAD_DATA
  }

  type Mutation {
    create(input: ContactInput): Contact
    update(id: Int!, input: ContactInput): Contact
    delete(id: Int!): Contact
  }
`);

// class Contact {
//   constructor(id, { name, phone }) {
//     this.id = id;
//     this.name = name;
//     this.phone = phone
//   }
// }


const root = {
  load: async ({ page, name, phone }, args, context, info) => {
    try {
      let params = {};
      let op = {}

      const limit = 5;
      const offset = (page - 1) * limit;

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
      console.log(params)

      const totalCount = await ContactModel.User.count();
      const { count, rows } = await ContactModel.User.findAndCountAll({
        where: params,
        limit,
        offset,
        order: [["id", "DESC"]],
      });

      const pages = Math.ceil(count / limit);
      return new Response({
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
      return new Response(error, false)
    }
  },

  create: async ({ input }) => {
    try {
      const contact = await ContactModel.User.create(input)
      return new Response(contact);
    } catch (error) {
      return new Response(error, false)
    }
  },

  update: async ({ id, input }) => {
    try {
      const contact = await ContactModel.User.update({ name: input.name, phone: input.phone }, {
        where: {
          id
        },
        returning: true,
        plain: true
      })
      return new Response(contact[1])
    } catch (err) {
      return new Response(err, false)
    }
  },

  delete: async ({ id }) => {
    try {
      const contact = ContactModel.User.destroy({
        where: {
          id
        }
      })
      return new Response(contact)
    } catch (error) {
      return new Response(error, false)
    }
  },
};

module.exports = { schema, root }
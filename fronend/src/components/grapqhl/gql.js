import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
query loadContact(
  $page: Int! = 1
  $name: String
  $phone: String
) {
    load(page: $page, name: $name, phone: $phone) {
      data {
        params {
        rowCount
        totalCount
        page
        pages
        name
        phone
        }
        contacts {
          id
          name
          phone
        }
      }
    }
  }
`;

export const CREATE_CONTACT = gql`
mutation createContact($name:String!,$phone:String!) {
    createContact(input: { name: $name, phone: $phone}) {
      id
      name
      phone
    }
  }
`;

export const DELETE_CONTACT = gql`
mutation deleteContact($id: ID!) {
    deleteContact(id: $id) {
      name
      phone
    }
  }
`;

export const UPDATE_CONTACT = gql`
mutation updateContact($id: ID!, $name: String ,$phone: String) {
  updateContact(id: $id,input: { name: $name, phone: $phone}) {
      name
      phone
    }
  }
`;
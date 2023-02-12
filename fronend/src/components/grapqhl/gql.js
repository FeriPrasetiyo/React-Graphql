import { gql } from '@apollo/client';

export const LOAD_CONTACTS = gql`
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
      success
    }
  }
`;

export const CREATE_CONTACT = gql`
mutation createContact($name:String!,$phone:String!) {
    create(input: { name: $name, phone: $phone}) {
      name
      phone
    }
  }
`;

export const DELETE_CONTACT = gql`
mutation deleteContact($id: Int!) {
    delete(id: $id) {
      name
      phone
    }
  }
`;

export const UPDATE_CONTACT = gql`
mutation updateContact($id: Int!, $name: String ,$phone: String) {
  update(id: $id,input: { name: $name, phone: $phone}) {
      name
      phone
    }
  }
`;
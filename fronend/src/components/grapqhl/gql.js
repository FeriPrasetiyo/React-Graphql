import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
query{
    getContacts{
        id
      name
      phone
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
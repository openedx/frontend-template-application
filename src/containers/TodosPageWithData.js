import { graphql } from 'react-apollo';

import gql from 'graphql-tag';

import TodosPage from '../components/TodosPage';

const todosQuery = gql`
  query User($id: String!) {
    User(id: $id) {
      todos {
        edges {
          node {
            id,
            title,
            completed
          }
        }
      }
    }
  }
`;

const TodosPageWithData = graphql(todosQuery)(TodosPage);

export default TodosPageWithData;

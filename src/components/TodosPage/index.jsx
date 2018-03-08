import React from 'react';

import PropTypes from 'prop-types';
import { CheckBox } from '@edx/paragon';

const TodoItem = ({ title, completed }) => (
  <div className="todo">
    <h3>{title}</h3>
    { completed && <span role="img" aria-label="complete">✅</span>}
    { !completed && <span role="img" aria-label="incomplete">😞</span>}
  </div>
);

const TodosList = ({ todos }) => (
  <ul>
    {
      todos
        .map(todo => (
          <li key={todo.id}>
            <TodoItem title={todo.title} completed={todo.completed} />
          </li>
        ))
    }
  </ul>
);

class TodosPage extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);

    this.state = {
      checked: false,
    };
  }

  onChange() {
    this.setState({ checked: !this.state.checked });
  }

  render() {
    const { data } = this.props;
    let todos = [];
    if (!data.loading && data.User) {
      todos = data.User.todos.edges.map(edge => edge.node);
    }

    return (
      <div>
        <h1>Todos</h1>
        <div>
          <CheckBox
            name="activate-todos"
            label="See Todos"
            checked={this.state.checked}
            onChange={this.onChange}
          />
        </div>
        <div>
          {
            this.state.checked
            && <TodosList todos={todos} />
          }
        </div>
      </div>
    );
  }
}

TodoItem.defaultProps = {
  title: '',
  completed: false,
};

TodoItem.propTypes = {
  title: PropTypes.string,
  completed: PropTypes.bool,
};

TodosList.defaultProps = {
  todos: [],
};

TodosList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object),
};

TodosPage.defaultProps = {
  data: {},
};

TodosPage.propTypes = {
  data: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default TodosPage;

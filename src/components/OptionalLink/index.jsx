import React from 'react';
import PropTypes from 'prop-types';
import CheckBox from '@edx/paragon/src/CheckBox';

class OptionalLink extends React.Component {
  constructor(props) {
    super(props);

    this.onCheck = this.handleCheck.bind(this);

    this.state = {
      isLinkHidden: false,
    };
  }

  handleCheck() {
    this.setState({ isLinkHidden: !this.state.isLinkHidden });
  }

  render() {
    return (
      <div>
        <CheckBox
          onChange={this.onCheck}
          name={'linktoggle'}
          label={'Toggle link!'}
        />
        {
          this.state.isLinkHidden
          && <a href={this.props.linkDestination}>Click Me!</a>
        }
      </div>
    );
  }
}

OptionalLink.propTypes = {
  linkDestination: PropTypes.string.isRequired,
};

export default OptionalLink;

import React from 'react';
import classNames from 'classnames';
import { Icon, Button, InputText } from '@edx/paragon';
import 'font-awesome/css/font-awesome.min.css';

import './Search.scss';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      searchFormClasses: ['search-form'],
      hasValueClass: 'has-value',
    };

    this.textInput = null;
    this.searchForm = null;

    this.setTextInputRef = this.setTextInputRef.bind(this);
    this.setSearchFormRef = this.setSearchFormRef.bind(this);
    this.handleTextInputChange = this.handleTextInputChange.bind(this);
    this.handleClearButtonClick = this.handleClearButtonClick.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  setTextInputRef(element) {
    this.textInput = element;
  }

  setSearchFormRef(element) {
    this.searchForm = element;
  }

  handleTextInputChange(value) {
    const { searchFormClasses, hasValueClass } = this.state;

    let classIndex;

    if (value.length > 0 && searchFormClasses.indexOf(hasValueClass) === -1) {
      searchFormClasses.push(hasValueClass);
    } else if (value.length === 0) {
      classIndex = searchFormClasses.indexOf(hasValueClass);
      if (classIndex !== -1) {
        searchFormClasses.splice(classIndex, 1);
      }
    }

    this.setState({
      value,
      searchFormClasses,
    });
  }

  handleClearButtonClick() {
    const { searchFormClasses, hasValueClass } = this.state;
    const classIndex = searchFormClasses.indexOf(hasValueClass);

    if (classIndex !== -1) {
      searchFormClasses.splice(classIndex, 1);
    }

    this.setState({
      value: '',
      searchFormClasses,
    });

    if (this.textInput) {
      this.textInput.focus();
    }
  }

  textInputHasValue() {
    return this.state.value.length > 0;
  }

  handleFocus() {
    const { searchFormClasses } = this.state;
    if (searchFormClasses.indexOf('focused') === -1) {
      searchFormClasses.push('focused');
      this.setState({
        searchFormClasses,
      });
    }
  }

  handleBlur() {
    const { searchFormClasses } = this.state;
    const classIndex = searchFormClasses.indexOf('focused');
    if (classIndex !== -1) {
      searchFormClasses.splice(classIndex, 1);
      this.setState({
        searchFormClasses,
      });
    }
  }

  renderSearchButtons() {
    const buttons = [
      <Button
        label="Search"
        type="submit"
        key="append-1"
        disabled={!this.textInputHasValue()}
      />,
    ];

    if (this.textInputHasValue()) {
      buttons.unshift((
        <Button
          className={['clear-search-btn']}
          label={
            <Icon className={['fa', 'fa-times']} screenReaderText="clear search" />
          }
          onClick={this.handleClearButtonClick}
          key="append-0"
        />
      ));
    }

    return buttons;
  }

  render() {
    const { value, searchFormClasses } = this.state;
    return (
      <form
        className={classNames(searchFormClasses)}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={element => (this.setSearchFormRef(element))}
      >
        <InputText
          name="search"
          label={
            <Icon className={['fa', 'fa-search']} screenReaderText="text" />
          }
          type="search"
          placeholder="Search"
          value={value}
          inline
          onChange={this.handleTextInputChange}
          inputGroupAppend={this.renderSearchButtons()}
          inputRef={this.setTextInputRef}
        />
      </form>
    );
  }
}

export default Search;

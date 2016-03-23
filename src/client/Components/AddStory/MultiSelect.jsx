import React from 'react';
import Formsy from 'formsy-react';
import ReactSelect from 'react-select';

import './less/select.less';

const MultiSelect = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    id: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    options: React.PropTypes.array.isRequired
  },

  render() {
    let className = ' ';
    className += this.showRequired() ? 'required' : '';
    className += this.showError() ? 'error' : '';

    let errorMessage = this.getErrorMessage();

    return (
      <div className={'form-group' + className }>
        <label htmlFor={this.props.id}>{this.props.title}</label>
        <ReactSelect
          ref="select"
          id={this.props.id}
          name={this.props.name}
          multi
          onChange={(values) => { this.setValue(values.map(value => value.value)); }}
          value={this.getValue()}
          options={this.props.options}
          />
        <span className='error-message'>{errorMessage}</span>
      </div>
    );
  }
});

export default MultiSelect;

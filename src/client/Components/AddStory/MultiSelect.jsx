import React from 'react';
import Formsy from 'formsy-react';
import ReactSelect from 'react-select';

// For some reason the react-select is not reading the styles when directly imported
// so just doing it manualy.
// NOTE: will need to change the styles a bit so as to conform to the material-ui look
// I am aiming for.
import './less/select.less';

/**
 * Just a wrapper around the Jed Watson's super awesome react-select plugin.
 */
const MultiSelect = React.createClass({
  mixins: [ Formsy.Mixin ],

  propTypes: {
    // unique id
    id: React.PropTypes.string.isRequired,
    // what the label tag should read
    title: React.PropTypes.string.isRequired,
    // name of the field (that will go into the model (object returned by formsy on valid submission))
    name: React.PropTypes.string.isRequired,
    // list of options
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

import React, { PropTypes } from 'react';
import { Paper, RaisedButton, MenuItem } from 'material-ui';
import Formsy from 'formsy-react';
import Tags from './tags';
import { FormsySelect, FormsyText } from 'formsy-material-ui';

import MultiSelect from './MultiSelect';

const GENRES_LIST = [
  'Comedy',
  'Drama',
  'Non-fiction',
  'Realistic-fiction',
  'Romance-novel',
  'Satire',
  'Tragedy',
  'Tragicomedy',
  'Horror'
];

export default class FormAddAtory extends React.Component {

  state = { canSubmit: false };

  componentWillMount() {
    this.genres = GENRES_LIST.map((genre) => <MenuItem value={genre} primaryText={genre} />);
    // let tags = Tags.map((tag) => <MenuItem value={tag} primaryText={tag} />);
    this.tags = Tags.map((tag) => {
      return ({ value: tag, label: tag });
    });
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  __onSubmit__ = (model) => {
    this.props.onSubmit(model, () => { this.refs.form.reset(); });
    // reseting the form after a valid submission
    // this.refs.form.reset();
  };

  render() {
    let genres = GENRES_LIST.map((genre) => <MenuItem value={genre} primaryText={genre} />);
    return (
        <Paper className='text-center' style={{ width: 400, padding: 50, margin: 'auto' }}>
          <h2>Add a shot to our library</h2>

          <Formsy.Form
            ref='form'
            onValid={ () => { this.setState({ canSubmit: true }); }}
            onInvalid={ () => { this.setState({ canSubmit: false }); }}
            onValidSubmit={ this.props.onSubmit }
          >

            <FormsyText name='title' required floatingLabelText='Title' hintText='What is the title?' />
            <br />
            <FormsyText name='author' required floatingLabelText='Author' hintText='Name of the author?' />
            <br style={{ marginTop: 20, marginBottom: 20 }}/>

            {/* MenuItem's from an array of values */}
            <FormsySelect name='genre' required floatingLabelText={'What\'s the type?'}>
              { genres }
            </FormsySelect>
            <br />

            <MultiSelect
              id='tags' name='tags' title='Tags'
              options={this.tags}
              required
            />
            <br style={{ marginTop: 20, marginBottom: 20 }}/>

            <FormsyText name='story' required
              floatingLabelText='Story'
              hintText='The entire story'
              multiLine={true} rows={3} rowsMax={10}
            /> <br />

            <RaisedButton type='submit' label='Submit' disabled={!this.state.canSubmit} style={{ marginTop: 50 }}/>
          </Formsy.Form>
        </Paper>
    );
  }
}

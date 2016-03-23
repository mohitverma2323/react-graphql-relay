import React from 'react';
// import Relay from 'react-relay';
import { RaisedButton, MenuItem, Paper } from 'material-ui';
import Formsy from 'formsy-react';
import Tags from './tags';
import { FormsySelect, FormsyText } from 'formsy-material-ui';

import MultiSelect from './MultiSelect';

const SHORT_LENGTH = 500;
const LONG_LENGTH = 1000;
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

class AddStory extends React.Component {
  state = { canSubmit: false };

  static errorMessages = {
    wordsError: 'Please only use letters'
  };

  componentWillMount() {
    this.genres = GENRES_LIST.map((genre) => <MenuItem value={genre} primaryText={genre} />);
    // let tags = Tags.map((tag) => <MenuItem value={tag} primaryText={tag} />);
    this.tags = Tags.map((tag) => {
      return ({ value: tag, label: tag });
    });
  }

  __onSubmit__ = (model) => {
    let duration = null;
    if (model.story.length < SHORT_LENGTH) {
      duration = 'short';
    } else if (model.story.length < LONG_LENGTH) {
      duration = 'medium';
    } else {
      duration = 'long';
    }
    model.duration = duration;
    console.log(model);

    // reseting the form after a valid submission
    this.refs.form.reset();
  };

  render() {
    let genres = GENRES_LIST.map((genre) => <MenuItem value={genre} primaryText={genre} />);
    return (
      <div className='container text-center' style={{ marginTop: 50, marginBottom: 50 }}>
        <Paper className='text-center' style={{ width: 400, padding: 50, margin: 'auto' }}>
          <h2>Add a shot to our library</h2>

          <Formsy.Form
            ref='form'
            onValid={ () => { this.setState({ canSubmit: true }); }}
            onInvalid={ () => { this.setState({ canSubmit: false }); }}
            onValidSubmit={ this.__onSubmit__ }
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
              multiLine={true} rows={3} rowsMax={50}
            /> <br />

            <RaisedButton type='submit' label='Submit' disabled={!this.state.canSubmit} style={{ marginTop: 50 }}/>
          </Formsy.Form>

        </Paper>
      </div>
    );
  }
}

//
// AddStory = Relay.createContainer(AddStory, {
//   fragments: {
//     AddStory: () => Relay.QL`
//       fragment on  {
//       }
//     `
//   }
// });
//
export default AddStory;

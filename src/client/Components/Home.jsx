import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static defaultProps = {

  };

  static propTypes = {

  };

  render() {
    return (
      <div>
      <div>
        story1
        ˈstɔːri
        noun
        1.
        an account of imaginary or real people and events told for entertainment.
        "an adventure story"
        synonyms:	tale, narrative, account, recital; More
        2.
        a report of an item of news in a newspaper, magazine, or broadcast.
        "stories in the local papers"
        synonyms:	news item, news report, article, feature, piece; More
      </div>
      <Link to='app'>App</Link>
      <Link to='about'>About</Link>
    </div>
    );
  }
}

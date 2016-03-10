import React from 'react';
import API from '../services/API';
import LinkStore from '../stores/LinkStore';

/**
 * This class renders a div that has Hello World!! as it's text content
 */
export default class Hello extends React.Component {
  constructor(props) {
    super(props);

    this.__getStateFromStore__ = this.__getStateFromStore__.bind(this);
    this.onChange = this.onChange.bind(this);
    this.linkStore = new LinkStore();

    this.state = this.__getStateFromStore__();
  }

  componentDidMount() {
    new API().getLinks();
    this.linkStore.on('change', this.onChange);
  }

  componentWillUnmount() {
    this.linkStore.removeListener('change', this.onChange);
  }

  onChange() {
    console.log('in view');
    this.setState(this.__getStateFromStore__());
  }

  __getStateFromStore__() {
    return { links: this.linkStore.getAllLinks() };
  }

  render() {
    let links = this.state.links.map(link =>
      <li key={link._id}>{link.name}</li>
    );

    return (
      <div>
        <ul>
          { links }
        </ul>
      </div>
    );
  }
}

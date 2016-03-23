import React from 'react';
import { GoMarkGithub } from 'react-icons/lib/go';

export default class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div
          style={{ background: '#404040', color: '#999', fontSize: '.85em', textAlign: 'center', padding: '3rem' }}>
          <div >
            <span >Created and maintained by Sherub Thakur.</span>
            <span >Source code and examples released under the MIT license.</span>
          </div>
          <div>
            <a href='https://github.com/jck-d-rpr/react-graphql-relay' >
              <GoMarkGithub />
            </a>
          </div>
        </div>
      </footer>
    );
  }
}

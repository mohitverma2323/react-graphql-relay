import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Hello from '../../../src/client/Components/Hello';


describe('Checks the validity of the Hello componnet', () => {
  it('checks App is a valid react element', () => {
    expect(TestUtils.isElement(<Hello />)).toBeTruthy();
  });

  it('checks if the helo world is displayed on the page', () => {
    let app = TestUtils.renderIntoDocument(<Hello />);
    let div = TestUtils.findRenderedDOMComponentWithTag(app, 'div');

    expect(ReactDOM.findDOMNode(div).textContent).toEqual('Hello World!!');
  });
});

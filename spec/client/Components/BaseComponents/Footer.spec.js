import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Footer from '../../../../src/client/Components/BaseComponents/Footer';

describe('Tests the integrity of the Footer component', () => {
  it('checks if message inside footer has my name :D', () => {
    let footer = TestUtils.renderIntoDocument(<Footer />);
    let spans = TestUtils.scryRenderedDOMComponentsWithTag(footer, 'span');

    expect(
      ReactDOM.findDOMNode(spans[0]).textContent
    ).toEqual(
      'Created and maintained by Sherub Thakur.'
    );

    expect(
      ReactDOM.findDOMNode(spans[1]).textContent
    ).toEqual(
      'Source code and examples released under the MIT license.'
    );
  });
});

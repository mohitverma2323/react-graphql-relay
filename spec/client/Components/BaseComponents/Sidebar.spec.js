import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Sidebar from '../../../../src/client/Components/BaseComponents/Sidebar';

describe('Checks the integrity of the sidebar component', () => {
  it('Checks if the Sidebar rendered if open is true', () => {
    const ShallowRenderer = TestUtils.createRenderer();
    ShallowRenderer.render(<Sidebar open={true} />);
    const sidebar = ShallowRenderer.getRenderOutput();

    expect(sidebar.props.open).toBeTruthy();
  });

  it('Checks if the Sidebar is hidden if open is false', () => {
    const ShallowRenderer = TestUtils.createRenderer();
    ShallowRenderer.render(<Sidebar open={false} />);
    const sidebar = ShallowRenderer.getRenderOutput();

    expect(sidebar.props.open).toBeFalsy();
  });
});

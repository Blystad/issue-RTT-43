/* global define, it, describe, before, expect, sinon */
import React from 'react/addons';
import testTree from 'react-test-tree';

import { Input } from 'react-bootstrap';

class TestComponent extends React.Component {
  renderBootstrapSelectInput() {
    return (
      <Input refCollection="bootstrapReact" type="select">
        <option value="2">Add a new policy</option>
        <option value="1">My Policy</option>
        <option value="3">Another Policy</option>
        <option value="6">A third Policy</option>
        <option value="12">Some other policy</option>
      </Input>
    );
  }
  renderNormalSelect() {
    return (
      <select refCollection="normal">
        <option value="2">Add a new policy</option>
        <option value="1">My Policy</option>
        <option value="3">Another Policy</option>
        <option value="6">A third Policy</option>
        <option value="12">Some other policy</option>
      </select>
    );
  }
  render() {
    return (
      <div>
        {this.renderBootstrapSelectInput()}
        {this.renderNormalSelect()}
      </div>
    );
  }
}

describe.only('TestComponent', () => {
  const rootElement = testTree(<TestComponent />);

  // OK
  it('confirm normal', () => {
    expect(rootElement.normal).to.exist;
    expect(rootElement.normal.length).to.equal(5);
  });

  // FAILS
  it('confirm bootstrap-react', () => {
    expect(rootElement.bootstrapReact).to.exist;
    expect(rootElement.bootstrapReact.length).to.equal(5);
  });
});

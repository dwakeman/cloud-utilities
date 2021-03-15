import React, { Component } from "react";
import LandingPage from '../content/LandingPage/LandingPage';
import ResourceInstances from '../components/ResourceInstances/ResourceInstances';
import Resources from '../components/ResourceInstances/Resources';
import "../components/components.scss";

class UIShellBody extends Component {
  components = {
    "Home": LandingPage,
    "Resource Instances": ResourceInstances,
    "Resources": Resources
  };
  defaultComponent = "Home";

  render() {
    const PatternName = this.components[
      this.props.patternName || this.defaultComponent
    ];
    return (
      <div className="pattern-container">
        <PatternName showDescription={true} />
      </div>
    );
  }
}
export default UIShellBody;

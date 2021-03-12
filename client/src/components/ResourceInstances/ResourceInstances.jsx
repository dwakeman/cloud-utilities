import React, { Component } from 'react';
import {
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListHead,
  StructuredListBody,
  StructuredListInput,
  Loading,
  Icon
} from "carbon-components-react";
import { iconCheckmarkSolid } from "carbon-icons";
import "../../pattern-components/patterns.scss";
import isDev from '../../util/isDev.ts';
//import IBMResources from '../../data/ibmResources.json';
import apiController from '../../util/apiController';
import regions from '../../util/regions';
import resourceGroups from '../../util/resourceGroups';


class ResourceInstances extends Component {


  

  constructor(props) {
    super(props);
    this.state = {
      selectedRow: 0,
      ibmResources: null,
      groups: {},
      isDev: isDev()
    }

  }

  componentDidMount () {
    console.log('[ResourceInstances.jsx] componentDidMount()...')
    this.getResources();

    const rGroups = {};
    
    resourceGroups.forEach(item => {
      rGroups[item.id] = item.name;
    });
    this.setState({groups: rGroups});
    console.log('the resource groups', this.state.rGroups);    
  }

  // addGroup(group) {
  //   this.groups[group.id] = group.name;
  // }

  getResources = () => {
    console.log('[ResourceInstances.jsx] getResources');

    apiController.get('/api/resources')
      .then(resp => {
        //console.log('axios success', data);
        this.setState({ibmResources: resp.data})
        console.log('[ResourceInstances.jsx] getResources retrieved resources!', resp.data);
      })
      .catch(err => {
        console.log('[ResourceInstances.jsx] getResources failed to retrieve resources!',err);
      })

    //console.log('getResources', hello);


  }


  onRowClick = id => {
    this.setState({ selectedRow: id });
  };

  renderRow = (row, id) => {

    return (
      <StructuredListRow key={id} onClick={() => this.onRowClick(id)}>
        <div>
          <StructuredListInput
            id={`row-${id}`}
            value="row-0"
            title="row-0"
            name="row-0"
            //defaultChecked={this.state.selectedRow === id}
            checked={this.state.selectedRow === id}
          />
          <StructuredListCell>
            <Icon
              className="bx--structured-list-svg"
              icon={iconCheckmarkSolid}
            />
          </StructuredListCell>
        </div>

        <StructuredListCell className="simple-list-row">
          {row.name}
        </StructuredListCell>
        <StructuredListCell className="simple-list-row">
          {regions[row.region_id] || row.region_id}
        </StructuredListCell>
        <StructuredListCell className="simple-list-row">
          {this.state.groups[row.resource_group_id]}
        </StructuredListCell>
        <StructuredListCell className="simple-list-row">
          {row.state}
        </StructuredListCell>
      </StructuredListRow>
    );
  };


  render ()  {



    let rows = <Loading />;
    if (this.state.ibmResources) {
        rows = this.state.ibmResources.resources.map((row, i) => {
          return this.renderRow(row, i);
        }
      )
    }

  console.log('[ResourceInstances.jsx] starting render() with resources', this.state.ibmResources);
//    const data = ["row1", "row2", "row3"];
    return (
      <div className="bx--grid pattern-container">
        <h1 className="pattern-title">Resource Instances</h1>
        <div className="bx--row">
          <div className="bx--col-xs-12">
            <StructuredListWrapper selection border>
              <StructuredListHead>
                <StructuredListRow head>
                  <StructuredListCell head />
                  <StructuredListCell head>
                    Resource Name
                  </StructuredListCell>
                  <StructuredListCell head>
                    Region
                  </StructuredListCell>
                  <StructuredListCell head>
                    Resource Group
                  </StructuredListCell>
                  <StructuredListCell head>
                    State
                  </StructuredListCell>
                </StructuredListRow>
              </StructuredListHead>

              <StructuredListBody>
                {rows}
              </StructuredListBody>
            </StructuredListWrapper>
          </div>
        </div>
      </div>
    );
  }
}

export default ResourceInstances;
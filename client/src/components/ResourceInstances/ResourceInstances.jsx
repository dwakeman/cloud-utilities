import React, { Component } from 'react';
import {
  StructuredListWrapper,
  StructuredListRow,
  StructuredListCell,
  StructuredListHead,
  StructuredListBody,
  StructuredListInput,
  Icon
} from "carbon-components-react";
import { iconCheckmarkSolid } from "carbon-icons";
import Header from "../../pattern-components/Header";
import "../../pattern-components/patterns.scss";

//import resourceController from '../../util/resourceController';
import isDev from '../../util/isDev.ts';
//import IBMResources from '../../data/ibmResources.json';
import apiController from '../../util/apiController';

class ResourceInstances extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedRow: 0,
      ibmResources: {},
      isDev: isDev()
    }

  }

  componentDidMount () {
    console.log('[ResourceInstances.jsx] componentDidMount()...')
    this.getResources();
    
  }

  // getResourceInstances = () => {
  //   console.log('[ResourceInstances.jsx] getResourceInstances');
  //   let ibmResources = null;
  //   if (this.state.isDev) {
  //     ibmResources = IBMResources; // Local development server, use local data instead of calling REST API
  //   } else {
  //     ibmResources = resourceController.get('/api/resources')
  //     .then(response => {
  //       console.log('IBM Resource Instances', response.data)
  //     })
  //     .catch(error => {
  //       console.log('Error fetching resource instances', error);
  //     });
  //   }

  //   this.setState({ibmResources: ibmResources});
    
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
          {row}
        </StructuredListCell>
      </StructuredListRow>
    );
  };


  render ()  {


  
    const data = ["row1", "row2", "row3"];
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
                    Simple List Title
                  </StructuredListCell>
                </StructuredListRow>
              </StructuredListHead>

              <StructuredListBody>
                {data.map((row, i) => {
                  return this.renderRow(row, i);
                })}
              </StructuredListBody>
            </StructuredListWrapper>
          </div>
        </div>
      </div>
    );
  }
}

export default ResourceInstances;
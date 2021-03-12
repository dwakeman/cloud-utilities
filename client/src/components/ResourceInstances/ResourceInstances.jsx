import React, { Component } from 'react';
//import axios from 'axios';
//import resourceController from '../../util/resourceController';
import isDev from '../../util/isDev.ts';
//import IBMResources from '../../data/ibmResources.json';
import apiController from '../../util/apiController';

class ResourceInstances extends Component {

  constructor(props) {
    super(props);
    this.state = {
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

  render ()  {


  
    return (
      <div>
        <p>This is where the Resource Instances List will go....</p>
      </div>
      
    )
  }
}

export default ResourceInstances;
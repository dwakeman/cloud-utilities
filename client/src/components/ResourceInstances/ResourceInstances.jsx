import React, { Component } from 'react';
//import axios from 'axios';
import resourceController from '../../util/resourceController';
import isDev from '../../util/isDev.ts';
import IBMResources from '../../data/ibmResources.json';
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
    this.getResourceInstances();
    this.getHello();
  }

  getResourceInstances = () => {
    console.log('[ResourceInstances.jsx] getResourceInstances');
    let ibmResources = null;
    if (this.state.isDev) {
      ibmResources = IBMResources; // Local development server, use local data instead of calling REST API
    } else {
      ibmResources = resourceController.get('/posts')
      .then(response => {
        console.log('IBM Resource Instances', response.data)
      })
      .catch(error => {
        console.log('Error fetching resource instances', error);
      });
    }

    this.setState({ibmResources: ibmResources});
    
  }

  getHello = () => {
    console.log('[ResourceInstances.jsx] getHello');

    let hello = apiController.get('/hello/json')
      .then(data => {
        console.log('axios success', data);
      })
      .catch(err => {
        console.log(err);
      })

    console.log('getHello', hello);


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
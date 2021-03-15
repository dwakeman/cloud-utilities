import React, { Component } from 'react';
import 'carbon-components/css/carbon-components.min.css';
import {
  DataTable,

//  Loading,
//  Icon
} from "carbon-components-react";
//import { iconCheckmarkSolid } from "carbon-icons";
import "../components.scss";
import isDev from '../../util/isDev.ts';
//import IBMResources from '../../data/ibmResources.json';
import apiController from '../../util/apiController';
//import regions from '../../util/regions';
import resourceGroups from '../../util/resourceGroups';


class Resources extends Component {


  

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
    console.log('[Resources.jsx] componentDidMount()...')
    this.getResources();

    const rGroups = {};
    
    resourceGroups.forEach(item => {
      rGroups[item.id] = item.name;
    });
    this.setState({groups: rGroups});
    console.log('the resource groups', this.state.rGroups);    
  }

  getResources = () => {
    console.log('[Resources.jsx] getResources');

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



  render() {

    const rows = [
      {
        id: 'load-balancer-1',
        name: 'Load Balancer 1',
        rule: 'Round robin',
        Status: 'Starting',
      },
      {
        id: 'load-balancer-2',
        name: 'Load Balancer 2',
        rule: 'DNS delegation',
        status: 'Active',
      },
      {
        id: 'load-balancer-3',
        name: 'Load Balancer 3',
        rule: 'Round robin',
        status: 'Disabled',
      },
    ];
    const headers = ['Name', 'Rule', 'Status'];

  //  let table = <Loading />


    return (
      <div className="bx--grid pattern-container">
        <h1 className="pattern-title">Resource Instances</h1>
        <div className="bx--row">
          <div className="bx--col-xs-12">
            <DataTable.Table>
              <DataTable.TableHead>
                <DataTable.TableRow>
                  {headers.map((header) => (
                    <DataTable.TableHeader key={header}>{header}</DataTable.TableHeader>
                  ))}
                </DataTable.TableRow>
              </DataTable.TableHead>
              <DataTable.TableBody>
                {rows.map((row) => (
                  <DataTable.TableRow key={row.id}>
                    {Object.keys(row)
                      .filter((key) => key !== 'id')
                      .map((key) => {
                        return <DataTable.TableCell key={key}>{row[key]}</DataTable.TableCell>;
                      })}
                  </DataTable.TableRow>
                ))}
              </DataTable.TableBody>
            </DataTable.Table>  
          </div>
        </div>
      </div>





    )


  }


}

export default Resources;
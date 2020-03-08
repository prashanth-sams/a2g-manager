// TableRow.js

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';


export const Ellipsis = styled.td`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  width: 500px;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  -moz-binding: url('ellipsis.xml#ellipsis');
`

class TableRow extends Component {

  constructor(props){
    super(props);
    this.delete = this.delete.bind(this);
    
    axios.defaults.baseURL = 'http://localhost:4000/en/question';
  }

  delete(){
    axios.get('/delete/'+this.props.obj._id)
            .then(res => {
              console.log('deleted');
              this.props.delete(this.props.indice);
            })
            .catch(err => console.log(err))
  }

  render() {
    return (
        <tr>
          <td>
            {this.props.obj.reference}
          </td>
          <td>
            {this.props.obj.tag_name}
          </td>
          <td>
            {this.props.obj.title}
          </td>
          <td>
            <Link to={"/en/edit/question/"+this.props.obj._id} className="btn btn-primary" id="edit-row" ><i className="fa fa-pencil" /></Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger"><i className="fa fa-trash" /></button>
          </td>
        </tr>
    );
  }
}

export default TableRow;
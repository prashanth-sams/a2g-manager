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
    console.log('props',props);

    super(props);
    this.delete = this.delete.bind(this);
    
    axios.defaults.baseURL = 'http://localhost:4000/keyword';
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
            {this.props.obj.tag_name}
          </td>
          <td>
            {this.props.obj.book_name}
          </td>
          <td>
            {this.props.obj.chapter_number}: {this.props.obj.verse_number}
          </td>
          <Ellipsis>
            {this.props.obj.verse_context}
          </Ellipsis>
          <td>
            <Link to={"/edit/"+this.props.obj._id} className="btn btn-primary">Edit</Link>
          </td>
          <td>
            <button onClick={this.delete} className="btn btn-danger">Delete</button>
          </td>
        </tr>
    );
  }
}

export default TableRow;
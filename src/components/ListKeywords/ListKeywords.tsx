import * as React from 'react';
import ListKeywordsProps from '../../interfaces/Keywords/ListKeywordsProps.interface';
import axios from 'axios';
import TableRow from './TableRow';
import './_style.css';

interface ListKeywordsState {
    manager: string[];
}

class ListKeywords extends React.Component<ListKeywordsProps, ListKeywordsState> {

    constructor(props: ListKeywordsProps) {
        super(props);
        this.state = {manager: []};
    }

    public componentDidMount = () => {
      axios.get('http://localhost:4000/keywords')
        .then(response =>{
          this.setState({manager: response.data});
        })
        .catch(error =>{
          console.log(error);
        })
    }

    public tabRow = () => {
      return this.state.manager.map((object, i) => {
        console.log(object,i);
        return <TableRow obj={object} key={i} indice={i} delete ={ (ind) => this.deleteItem(ind)} />;
      });
    }
  
    public deleteItem = (index) => {
      this.setState({manager: this.state.manager.filter((_,i) => i !== index)});
    }

    public render() {
        return (
          <div>				
            <h3 className="header-top">Verse List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>Tags</th>
                  <th>Book</th>
                  <th>Chapter</th>
                  <th>Verse</th>
                  <th colSpan={2}>Action</th>
                </tr>
              </thead>
              <tbody>
                { this.tabRow() }
              </tbody>
            </table>
          </div>
        );
    }
}

export default ListKeywords;
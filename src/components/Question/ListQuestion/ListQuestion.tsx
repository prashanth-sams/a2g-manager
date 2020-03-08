import * as React from 'react';
import ListQuestionProps from '../../../interfaces/Question/ListQuestionProps.interface';
import axios from 'axios';
import TableRow from './TableRow';
import './_style.css';

interface ListQuestionState {
  lang: string,
  manager: string[];
}

class ListQuestion extends React.Component<ListQuestionProps, ListQuestionState> {

    constructor(props: ListQuestionProps) {
        super(props);
        this.state = {
          lang: 'en',
          manager: []
        };
    }

    public componentDidMount = () => {
      const language = this.state.lang; // read from URL current language
      axios.get(`http://localhost:4000/${language}/question`)
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
            <h3 className="header-top"><i className="fa fa-list" /> List Questions</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tags</th>
                  <th>Question</th>
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

export default ListQuestion;
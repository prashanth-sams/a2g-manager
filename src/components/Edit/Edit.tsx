import * as React from 'react'
import EditProps from '../../interfaces/EditProps.interface'
import axios from 'axios';
import './_style.css';
import { RouteComponentProps } from 'react-router';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    align?: string;
  }
}

interface EditState {
  error: boolean
  tag_name: string[],
  book_name: string,
  chapter_number: number,
  verse_number: string,
  verse_context: string
}

export class Edit extends React.Component<EditProps & RouteComponentProps, EditState> {
  constructor(props: EditProps & RouteComponentProps) {
    super(props);

    this.state = {
      error: false,
			tag_name : [],
			book_name : '',
			chapter_number: null,
			verse_number: '',
			verse_context: ''
    };
    axios.defaults.baseURL = 'http://localhost:4000/keyword';
  }

  public componentDidMount = () => {
    axios.get('/edit/'+(this.props.match.params as any).id)
        .then(response => {
            this.setState({ 
              tag_name: response.data.tag_name, 
              book_name: response.data.book_name,
              chapter_number: response.data.chapter_number,
              verse_number: response.data.verse_number,
              verse_context: response.data.verse_context 
            });
        })
        .catch(error => {
            console.log(error);
        })
  }


  public onChangeTagName = (e) => {
    this.setState({
      tag_name: e.target.value
    });
  }

  public onChangeBookName = (e) => {
      this.setState({
        book_name: e.target.value
      })  
  }
  
  public onChangeChapterNumber = (e) => {
      this.setState({
        chapter_number: e.target.value
      })
  }

  public onChangeVerseNumber = (e) => {
    this.setState({
      verse_number: e.target.value
    })
  }

  public onChangeVerseContext = (e) => {
    this.setState({
      verse_context: e.target.value
    })
  }

  public onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      tag_name: this.state.tag_name,
      book_name: this.state.book_name,
      chapter_number: this.state.chapter_number,
      verse_number: this.state.verse_number,
      verse_context: this.state.verse_context
    };
    axios.post('/update/'+(this.props.match.params as any).id, obj)
        .then(res => console.log(res.data));

    this.props.history.push('/index');
  }


  public render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3 align="center">Update Verse</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Tags: </label>
            <input type="text" className="form-control" 
              name="tags" 
              value={this.state.tag_name} 
              onChange={this.onChangeTagName} 
            />
          </div>
          <div className="form-group">
            <label>Book: </label>
            <input type="text" className="form-control" 
              name="book" 
              value={this.state.book_name} 
              onChange={this.onChangeBookName} 
            />
          </div>
          <div className="form-group">
            <label>Chapter: </label>
            <input type="text" className="form-control" 
              name="chapter" 
              value={this.state.chapter_number} 
              onChange={this.onChangeChapterNumber} 
            />
          </div>
          <div className="form-group">
            <label>Verse number: </label>
            <input type="text" className="form-control" 
              name="verse number" 
              value={this.state.verse_number} 
              onChange={this.onChangeVerseNumber} 
            />
          </div>
          <div className="form-group">
            <label>Verse: </label>
            <input type="text" className="form-control" 
              name="verse" 
              value={this.state.verse_context} 
              onChange={this.onChangeVerseContext} 
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Update Verse" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}

export default Edit
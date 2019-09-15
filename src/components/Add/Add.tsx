import * as React from 'react';
import KeywordsProps from '../../interfaces/KeywordsProps.interface';
import Select, { components } from 'react-select';
import axios from 'axios';
import { colourOptions } from './data';
import './_style.css';

declare module 'react' {
  interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    // extends React's HTMLAttributes
    align?: string;
  }
}

interface KeywordsState {
  error: boolean
  tag_name: string[],
  book_name: string,
  chapter_number: number,
  verse_number: string,
  verse_context: string
}

const MultiValueLabel = (props) => {
	return (<components.MultiValueLabel {...props}/>);
};

export class Add extends React.Component<KeywordsProps, KeywordsState> {
  constructor(props: KeywordsProps) {
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

  public onSubmit = () => {
    console.log(`The values are ${this.state.tag_name}, ${this.state.book_name}, ${this.state.chapter_number}, ${this.state.verse_number}, and ${this.state.verse_context}`)
    
    const obj = {
			tag_name : this.state.tag_name,
			book_name : this.state.book_name,
			chapter_number : this.state.chapter_number,
			verse_number : this.state.verse_number,
			verse_context : this.state.verse_context
    };
    
    axios.post('/add', obj)
			.then( res=> {
        if(res.status !== 200) {
          this.setState({ error: true});
          return;
        }
				console.log(res.data)
			});
  }

  public onChangeTagName = (newValue, actionMeta) => {
    console.group('Value Changed');
		console.log(newValue);
		console.log(`action: ${actionMeta.action}`);
		console.groupEnd();

    const values = [];
    
    if (newValue != null) {
      for (let i = 0, l = newValue.length; i < l; i++) {
        values.push(newValue[i].value);
      }
    }

		this.setState({
			tag_name: values
		});
  }

  public onChangeBookName = (e) => {
		this.setState({
			book_name : e.target.value
		});
  }
  
  public onChangeChapterNumber = (e) => {
		this.setState({
			chapter_number : e.target.value
		});
  }
  
  public onChangeVerseNumber = (e) => {
		this.setState({
			verse_number : e.target.value
		});
  }
  
  public onChangeVerseContext = (e) => {
		this.setState({
			verse_context : e.target.value
		});
	}

  public render() {
    // const {tag_name, book_name} = this.props;
    return (
      <div style={{marginTop: 10}}>
				<h3 align="center" className="header-top">Add Verse</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group" style={{ fontSize: '0.9rem' }}>
            <Select
              name="tags"
              isMulti={true}
              onChange={this.onChangeTagName}
              options={colourOptions}
              placeholder="Tags [eg., love]"
              autoFocus={true}
              components={{ MultiValueLabel }}
              styles={{ multiValueLabel: (base) => ({ ...base, backgroundColor: colourOptions[2].color, color: 'white' }) }}
              required={true}
            />
          </div>
          <div className="form-group">
            <input type="text" className="form-control"
              name="book"
              placeholder="Book [eg., matthew]"
              value={this.state.book_name}
              onChange={this.onChangeBookName}
              required={true}
            />
          </div>
          <div className="form-group">
            <input type="text" className="form-control"
              name="chapter"
              placeholder="Chapter"
              value={this.state.chapter_number || ''}
              onChange={this.onChangeChapterNumber}
              required={true}
            />
          </div>
          <div className="form-group">
            <input type="text" className="form-control"
              name="verse number"
              placeholder="Verse number"
              value={this.state.verse_number}
              onChange={this.onChangeVerseNumber}
              required={true}
            />
          </div>
          <div className="form-group">
            <input type="text" className="form-control"
              name="verse"
              placeholder="Verse context"
              value={this.state.verse_context}
              onChange={this.onChangeVerseContext}
              required={true}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Verse" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}

export default Add
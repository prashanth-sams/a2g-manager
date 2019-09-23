import * as React from 'react';
import AddQuestionProps from '../../interfaces/AddQuestionProps.interface';
import Select, { components } from 'react-select';
import axios from 'axios';
import { colourOptions } from './data';
import './_style.css';
import AddBibleSection from './AddBibleSection';

const AddBibleWrapper = props => (
  <div>
    {props.children}
    <button type="button" className="btn btn-primary" id="add-row" onClick={props.addBible}>
      <i className="fa fa-plus" />
    </button>    
  </div>
);

interface AddQuestionState {
  error: boolean
  tag_name: string[],
  title: string,
  reference: string,
  bible: [],
  book_name : string,
  chapter_number: null,
  verse_number: string,
  verse_context: string,
  numBible: number
}

const MultiValueLabel = (props) => {
	return (<components.MultiValueLabel {...props}/>);
};

export class AddQuestion extends React.Component<AddQuestionProps, AddQuestionState> {
  constructor(props: AddQuestionProps) {
    super(props);

    this.state = {
      error: false,
      tag_name : [],
      title : '',
      reference : '',
      bible: [],
      book_name : '',
      chapter_number: null,
      verse_number: '',
      verse_context: '',
      numBible: 0
    };
    axios.defaults.baseURL = 'http://localhost:4000/question';
  }

  public onSubmit = () => {
    console.log(`The values are ${this.state.tag_name}, ${this.state.title}, ${this.state.reference}, ${this.state.book_name}, ${this.state.chapter_number}, ${this.state.verse_number}, and ${this.state.verse_context}`)

    const obj = {
      tag_name : this.state.tag_name,
      title : this.state.title,
      reference : this.state.reference,
      bible : [{
        book_name : this.state.book_name,
        chapter_number : this.state.chapter_number,
        verse_number : this.state.verse_number,
        verse_context : this.state.verse_context
      }]
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

  public onChangeTitle = (e) => {
		this.setState({
			title : e.target.value
		});
  }

  public onChangeReference = (e) => {
		this.setState({
			reference : e.target.value
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

  public onAddBible = () => {
    this.setState({
      numBible: this.state.numBible + 1
    });
  }

  public render() {
    const children = [];

    for (let i = 0; i < this.state.numBible; i += 1) {
      // children.push(<AddBible key={i} number={i}/>);
      children.push(<AddBibleSection key={i} />);
    };

    // const {tag_name, book_name} = this.props;
    return (
      <div style={{marginTop: 10}}>
        <h3 className="header-top">Bible Question</h3>
        <form onSubmit={this.onSubmit}>
          <div className="question-top-container">
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
              <textarea id="form7" className="md-textarea form-control" rows={2}
                name="title"
                onChange={this.onChangeTitle}
                value={this.state.title}
                placeholder="Question [eg., Who is Jesus?]"
              />
            </div>
            <div className="form-group">
                <input type="text" className="form-control"
                  name="reference"
                  placeholder="Reference ID [eg., jesus-10]"
                  value={this.state.reference}
                  onChange={this.onChangeReference}
                  required={true}
                />
              </div>
          </div>
          <div className="bible-outer-container">
            <button type="button" className="bible-label">Add Bible <span className="badge">1</span></button>
            <div className="bible-container">
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
                <textarea id="form7" className="md-textarea form-control" rows={4}
                  name="verse"
                  onChange={this.onChangeVerseContext}
                  value={this.state.verse_context}
                  placeholder="Verse context"
                />
              </div>
            </div>
            
            <AddBibleWrapper addBible={this.onAddBible}>
              {children}
            </AddBibleWrapper>

          </div>
          <div className="form-group" id="submit-question-container">
            <input type="submit" value="Add Question" className="btn btn-primary" id="submit" />
          </div>
        </form>
      </div>
    )
  }
}

export default AddQuestion
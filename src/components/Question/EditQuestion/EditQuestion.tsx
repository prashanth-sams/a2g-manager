import * as React from 'react'
import EditQuestionProps from '../../../interfaces/Question/EditQuestionProps.interface'
import axios from 'axios';
import './_style.css';
import { RouteComponentProps } from 'react-router';
import Select, { components } from 'react-select';
import { colourOptions } from '../../Question/AddQuestion/data';
import { connect } from "react-redux";
import EditBibleSection from './EditBibleSection';
import { startTagname, startQuestion, startReference, editTagname, editQuestion, editReference } from "../../../actions/questiondetails";
// import {  } from "../../../actions/questiondetails";
import { startAddBibleverse } from "../../../actions/biblelist";

const EditBibleWrapper = (props) => (
  <div>
      <div>
        {props.children}
        <button type="button" className="btn btn-primary" id="add-row" onClick={props.onClickAdd}>
          <i className="fa fa-plus" />
        </button>
      </div>
  </div>
);

interface EditQuestionState {
  error: boolean
  tag_name: string[],
  title: string,
  reference: string,
  bible_count: number,
  bible: any
}

const MultiValueLabel = (props) => {
	return (<components.MultiValueLabel {...props}/>);
};

export class EditQuestion extends React.Component<EditQuestionProps & RouteComponentProps, EditQuestionState> {
  constructor(props: EditQuestionProps & RouteComponentProps) {
    super(props);

    this.state = {
      error: false,
      tag_name : [],
      title : '',
      reference : '',
      bible_count: 0,
      bible: []
    };
    axios.defaults.baseURL = 'http://localhost:4000/question';
  }

  public componentDidMount = () => {
    axios.get('/edit/'+(this.props.match.params as any).id)
    .then(response => {
      console.log(response.data);
      this.setState({ 
        tag_name: response.data.tag_name, 
        title: response.data.title,
        reference: response.data.reference,
        bible: response.data.bible
      });
      this.props.startTagname(response.data.tag_name);
      this.props.startQuestion(response.data.title);
      this.props.startReference(response.data.reference);

      console.log("============");
      console.log(response.data.bible);
      console.log("============");
      // const biblelist = [{
      //   book_name: response.data.bible.book_name,
      //   chapter_number: response.data.bible.chapter_number,
      //   verse_number: response.data.bible.verse_number,
      //   verse_context: response.data.bible.verse_context
      // }]
      this.props.startAddBibleverse(response.data.bible);

      // this.props.startAddBibleverse(biblelist);
    })
    .catch(error => {
        console.log(error);
    })

    
  }

  public onEditBible = (e) => {    
    this.setState({
      bible_count: this.state.bible_count + 1
    });
  }

  // public onChangeTagName = (e) => {
  //   this.setState({
  //     tag_name: e.target.value
  //   });
  // }

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
    this.props.editTagname(values);
  }

  public onChangeTitle = (e) => {
		this.setState({
			title : e.target.value
    });
    this.props.editQuestion(e.target.value);
  }

  public onChangeReference = (e) => {
		this.setState({
			reference : e.target.value
    });
    this.props.editReference(e.target.value);
  }

  public onSubmit = (e) => {
    // e.preventDefault();
    // const obj = {
    //   tag_name: this.state.tag_name,
    //   book_name: this.state.book_name,
    //   chapter_number: this.state.chapter_number,
    //   verse_number: this.state.verse_number,
    //   verse_context: this.state.verse_context
    // };
    // axios.post('/update/'+(this.props.match.params as any).id, obj)
    //     .then(res => console.log(res.data));

    this.props.history.push('/list/question');
  }


  public render() {
    const children = [];
    
    for (let i = 0; i < this.state.bible_count; i += 1) {
      children.push(<EditBibleSection key={i}/>);
    };

    return (
      <div style={{ marginTop: 10 }}>
        <h3 className="header-top">Edit Question</h3>
        <form onSubmit={this.onSubmit}>

          {/* <div className="form-group">
            <label>Tags: </label>
            <input type="text" className="form-control" 
              name="tags" 
              value={this.state.tag_name} 
              onChange={this.onChangeTagName} 
            />
          </div> */}

          <div className="question-top-container">
            <div className="form-group" style={{ fontSize: '0.9rem' }}>
              <Select
                name="tags"
                isMulti={true}
                onChange={this.onChangeTagName}
                options={colourOptions}
                placeholder="Tags [eg., love]"
                autoFocus={true}
                value={this.state.tag_name} 
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
            <EditBibleWrapper onClickAdd={this.onEditBible} >
              {children}
            </EditBibleWrapper>
          </div>

          <div className="form-group" id="submit-question-container">
            <button type="submit" value="save changes" className="btn btn-primary">Save <i className="fa fa-save"/></button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    questiondetails: state.questiondetails,
    // biblelist: state.biblelist
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  startTagname: tagname => dispatch(startTagname(tagname)),
  startQuestion: title => dispatch(startQuestion(title)),
  startReference: reference => dispatch(startReference(reference)),
  startAddBibleverse: bibleverse => dispatch(startAddBibleverse(bibleverse)),
  editTagname: tagname => dispatch(editTagname(tagname)),
  editQuestion: title => dispatch(editQuestion(title)),
  editReference: reference => dispatch(editReference(reference))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditQuestion);

// export default EditQuestion
import * as React from 'react';
import AddQuestionProps from '../../../interfaces/Question/AddQuestionProps.interface';
import Select, { components } from 'react-select';
import axios from 'axios';
import { colourOptions } from './data';
import './_style.css';
import AddBibleSection from './AddBibleSection';
import { connect } from "react-redux";
import { startTagname, startQuestion, startAnswer, startReference } from "../../../actions/questiondetails";

const AddBibleWrapper = (props) => (
  <div>
      <div>
        {props.children}
        <button type="button" className="btn btn-primary" id="add-row" onClick={props.onClickAdd}>
          <i className="fa fa-plus" />
        </button>
      </div>
  </div>
);

interface AddQuestionState {
  error: boolean,
  lang: string,
  tag_name: string[],
  title: string,
  answer: string,
  reference: string,
  bible_count: number
}

const MultiValueLabel = (props) => {
	return (<components.MultiValueLabel {...props}/>);
};

export class AddQuestion extends React.Component<AddQuestionProps, AddQuestionState> {
  public stepInput: React.RefObject<HTMLInputElement>;
  constructor(props: AddQuestionProps) {
    super(props);

    this.state = {
      error: false,
      lang: 'en',
      tag_name : [],
      title : '',
      answer: '',
      reference : '',
      bible_count: 0
    };
    
    this.stepInput = React.createRef();

    const language = this.state.lang; // read from URL current language
    axios.defaults.baseURL = `http://localhost:4000/${language}/question`;
  }
  
  public onAddBible = (e) => {    
    this.setState({
      bible_count: this.state.bible_count + 1
    });
  }
  
  public componentDidMount = () => {
    this.stepInput.current.focus();
    // this.state.lang = window.location.href;
  }

  public componentDidUpdate = () => {
    this.stepInput.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }

  public onSubmit = (e) => {
    
    const obj = {
      tag_name : this.props.questiondetails.tagname.tagname,
      title : this.props.questiondetails.question.title,
      answer : this.props.questiondetails.answer.answer,
      reference : this.props.questiondetails.reference.reference,
      lang : this.state.lang,
      bible : this.props.biblelist      
    };
    
    console.log(obj);
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
    this.props.startTagname(values);
  }

  public onChangeTitle = (e) => {
		this.setState({
			title : e.target.value
    });
    this.props.startQuestion(e.target.value);
  }

  public onChangeAnswer = (e) => {
		this.setState({
			answer : e.target.value
    });
    this.props.startAnswer(e.target.value);
  }

  public onChangeReference = (e) => {
		this.setState({
			reference : e.target.value
    });
    this.props.startReference(e.target.value);
  }

  public render() {
    const children = [];
    
    for (let i = 0; i < this.state.bible_count; i += 1) {
      children.push(<AddBibleSection key={i}/>);
    };

    return (
      <div style={{marginTop: 10}}>
        <h3 className="header-top" id="question-top"><i className="fa fa-plus" /> Bible Question</h3>
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
              <textarea id="form7" className="md-textarea form-control" rows={2}
                name="answer"
                value={this.state.answer}
                onChange={this.onChangeAnswer}
                placeholder="Answer [eg., Jesus is the image of the invisible God]"
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
            <AddBibleWrapper onClickAdd={this.onAddBible} >
              {children}
            </AddBibleWrapper>
          </div>
          <div className="form-group" id="submit-question-container">
            <button type="submit" value="Add Question" className="btn btn-primary" id="submit" ref={this.stepInput}>Save <i className="fa fa-save"/></button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    questiondetails: state.questiondetails,
    biblelist: state.biblelist
  }
}
const mapDispatchToProps = (dispatch, props) => ({
  startTagname: tagname => dispatch(startTagname(tagname)),
  startQuestion: title => dispatch(startQuestion(title)),
  startAnswer: answer => dispatch(startAnswer(answer)),
  startReference: reference => dispatch(startReference(reference))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddQuestion);
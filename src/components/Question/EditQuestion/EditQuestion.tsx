import * as React from 'react'
import EditQuestionProps from '../../../interfaces/Question/EditQuestionProps.interface'
import axios from 'axios';
import './_style.css';
import { RouteComponentProps } from 'react-router';
import Select, { components } from 'react-select';
import { colourOptions } from '../../Question/AddQuestion/data';
import { connect } from "react-redux";
import EditBibleSection from './EditBibleSection';
import BibleArray from './BibleArray';
import { startTagname, startQuestion, startAnswer, startReference } from "../../../actions/questiondetails";
import { startAddBibleverse } from "../../../actions/biblelist";

const EditBibleWrapper = (props) => (
  <div>
      <div>
        {props.biblearray}
        {props.children}
        <button type="button" className="btn btn-primary" id="add-row" onClick={props.onClickAdd}>
          <i className="fa fa-plus" />
        </button>
      </div>
  </div>
);

interface EditQuestionState {
  error: boolean,
  lang: string,
  tag_name: string[],
  title: string,
  answer: string,
  reference: string,
  bible_count: number,
  bible: any,
  init_tag_name: any
}

const MultiValueLabel = (props) => {
	return (<components.MultiValueLabel {...props}/>);
};

export class EditQuestion extends React.Component<EditQuestionProps & RouteComponentProps, EditQuestionState> {
  constructor(props: EditQuestionProps & RouteComponentProps) {
    super(props);

    this.state = {
      error: false,
      lang: 'en',
      tag_name : [],
      title : '',
      answer: '',
      reference : '',
      bible_count: 0,
      bible: [],
      init_tag_name: []
    };

    const language = this.state.lang; // read from URL current language
    axios.defaults.baseURL = `http://localhost:4000/${language}/question`;
  }

  public componentDidMount = () => {
    axios.get('/edit/'+(this.props.match.params as any).id)
    .then(response => {
      console.log(response.data);
      this.setState({ 
        tag_name: response.data.tag_name, 
        title: response.data.title,
        answer: response.data.answer,
        reference: response.data.reference,
        bible: response.data.bible,
        lang: response.data.lang
      });
      this.props.startTagname(response.data.tag_name);
      this.props.startQuestion(response.data.title);
      this.props.startAnswer(response.data.answer);
      this.props.startReference(response.data.reference);

      response.data.bible.map((object, i) => {
        this.props.startAddBibleverse(object);
      });
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

  public onChangeTagName = (newValue, actionMeta) => {
    console.group('Value Changed');
    console.log('===========');
    console.log(newValue);
    console.log('===========');
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

  public onSubmit = (e) => {
    const obj = {
      tag_name : this.props.questiondetails.tagname.tagname,
      title : this.props.questiondetails.question.title,
      answer : this.props.questiondetails.answer.answer,
      reference : this.props.questiondetails.reference.reference,
      lang : 'en',
      bible : this.props.biblelist      
    };
    
    debugger;
    console.log(obj);
    axios.post('/update/'+(this.props.match.params as any).id, obj)
			.then( res=> {
        if(res.status !== 200) {
          this.setState({ error: true});
          return;
        }
        console.log(res.data)
      });
      
    this.props.history.push('/en/list/question');
  }

  public deleteItem = (index) => {
    this.setState({bible: this.state.bible.filter((_,i) => i !== index)});
  }

  public render() {
    const children = [];
    for (let i = 0; i < this.state.bible_count; i += 1) {
      children.push(<EditBibleSection key={i}/>);
    };

    const biblearray = [];
    this.state.bible.map((object, i) => {
      console.log(object,i);
      biblearray.push(<BibleArray obj={object} indice={i} parentid = {(this.props.match.params as any).id} delete ={ (ind) => this.deleteItem(ind)}/>);
      // return <BibleArray obj={object} key={i} indice={i} />;
    });

    return (
      <div style={{ marginTop: 10 }}>
        <h3 className="header-top" id="question-top"><i className="fa fa-pencil" /> Edit Question</h3>
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
                // value={this.state.tag_name} 
                // defaultValue={{ value: 'peace', label: 'Peace'}}
                defaultValue={this.state.tag_name}
                // defaultValue={[{ value: 'peace', label: 'Peace'}, { value: 'peasce', label: 'Peasce'}]}
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
            <EditBibleWrapper onClickAdd={this.onEditBible} >
              {biblearray}
              {children}
            </EditBibleWrapper>
          </div>

          <div className="form-group" id="submit-question-container">
            <button type="submit" value="save changes" id="submit" className="btn btn-primary">Save <i className="fa fa-save"/></button>
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
  startReference: reference => dispatch(startReference(reference)),
  startAddBibleverse: bibleverse => dispatch(startAddBibleverse(bibleverse))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditQuestion);
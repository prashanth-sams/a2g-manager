import * as React from 'react';
import AddRevelationProps from '../../../interfaces/Revelation/AddRevelationProps.interface';
import axios from 'axios';

interface AddRevelationState {
  name: string,
  start: string,
  end: string,
  url: string,
  body: string,
  image: string
}

export class AddKeywords extends React.Component<AddRevelationProps, AddRevelationState> {
  constructor(props: AddRevelationProps) {
    super(props);

    this.state = {
			name: '',
			start: '',
			end: '',
			url: '',
      body: '',
      image: '',
    };
    axios.defaults.baseURL = 'http://localhost:4000/revelation';
  }

  public onSubmit = () => {
    console.log(`The values are ${this.state.name}, ${this.state.start}, ${this.state.end}, ${this.state.url}, ${this.state.body}, and ${this.state.image}`)
    
    const obj = {
			name : this.state.name,
			start : this.state.start,
			end : this.state.end,
			url : this.state.url,
      body : this.state.body,
      image : this.state.image
    };
    
    axios.post('/add', obj)
			.then( res=> {
        if(res.status !== 200) {
          return;
        }
				console.log(res.data)
			});
  }

  public onChangeName = (e) => {
		this.setState({
			name : e.target.value
		});
  }
  
  public onChangeStart = (e) => {
		this.setState({
			start : e.target.value
		});
  }
  
  public onChangeEnd = (e) => {
		this.setState({
			end : e.target.value
		});
  }
  
  public onChangeUrl = (e) => {
		this.setState({
			url : e.target.value
		});
  }
  
  public onChangeBody = (e) => {
		this.setState({
			body : e.target.value
		});
  }
  
  public onChangeImage = (e) => {
		this.setState({
			image : e.target.value
		});
  }

  public render() {
    return (
      <div style={{marginTop: 10}}>
        <h3 className="header-top">Bible Revelation</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="text" className="form-control"
              name="name"
              placeholder="Title"
              value={this.state.name}
              onChange={this.onChangeName}
              required={true}
            />
          </div>
          <div className="form-group">
            <input type="text" className="form-control"
              name="start"
              placeholder="Start date"
              value={this.state.start}
              onChange={this.onChangeStart}
              required={true}
            />
          </div>
          <div className="form-group">
            <input type="text" className="form-control"
              name="end"
              placeholder="End date"
              value={this.state.end || ''}
              onChange={this.onChangeEnd}
            />
          </div>
          <div className="form-group">
            <input type="text" className="form-control"
              name="url"
              placeholder="link url"
              value={this.state.url || ''}
              onChange={this.onChangeUrl}
            />
          </div>
          <div className="form-group">
            <input type="text" className="form-control"
              name="body"
              placeholder="Type context here"
              value={this.state.body}
              onChange={this.onChangeBody}
              required={true}
            />
          </div>
          <div className="form-group">
            <input type="text" className="form-control"
              name="image"
              placeholder="Image url"
              value={this.state.image}
              onChange={this.onChangeImage}
              required={true}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Add Revelation" className="btn btn-primary" id="submit"/>
          </div>
        </form>
      </div>
    )
  }
}

export default AddKeywords
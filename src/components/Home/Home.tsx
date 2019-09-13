import * as React from 'react';
import './_style.css';
// import {ReduxForm} from "../decorators/ReduxForm";

interface HomeProps {

}

interface HomeState {
  name: string;
}

// @ReduxForm({form: 'home'})
class Home extends React.Component<HomeProps, HomeState> {
  constructor(props: HomeProps) {
      super(props);
      this.state = {name: 'Everton'};
  }

  public render() {
    return (
      <div className="hello">
        <div className="greeting">
          Home
        </div>
      </div>
    );
  }
}

export default Home;
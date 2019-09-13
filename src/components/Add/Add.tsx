import * as React from 'react';

interface AddProps {

}

interface AddState {
    name: string;
}

class Add extends React.Component<AddProps, AddState> {
    constructor(props: AddProps) {
        super(props);
        this.state = {name: 'Everton'};
    }

    public render() {
        return (
          <div className="hello">
            <div className="greeting">
              Add
            </div>
          </div>
        );
    }
}

export default Add;
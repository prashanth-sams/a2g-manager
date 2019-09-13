import * as React from 'react';

interface EditProps {

}

interface EditState {
    name: string;
}

class Edit extends React.Component<EditProps, EditState> {
    constructor(props: EditProps) {
        super(props);
        this.state = {name: 'Everton'};
    }

    public render() {
        return (
          <div className="hello">
            <div className="greeting">
              Edit
            </div>
          </div>
        );
    }
}

export default Edit;
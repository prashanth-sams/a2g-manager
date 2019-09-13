import * as React from 'react';

interface ListProps {

}

interface ListState {
    name: string;
}

class List extends React.Component<ListProps, ListState> {
    constructor(props: ListProps) {
        super(props);
        this.state = {name: 'Everton'};
    }

    public render() {
        return (
          <div className="hello">
            <div className="greeting">
              List
            </div>
          </div>
        );
    }
}

export default List;
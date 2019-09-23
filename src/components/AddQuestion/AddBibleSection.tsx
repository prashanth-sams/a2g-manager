import * as React from 'react';

export class AddBibleSection extends React.Component {
    constructor(props){
        super(props);
    }

    public render() {
        return (
            <div className="bible-container">
                <div className="form-group">
                    <input type="text" className="form-control"
                        name="book"
                        placeholder="Book [eg., matthew]"
                        required={true}
                    />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control"
                        name="chapter"
                        placeholder="Chapter"
                        required={true}
                    />
                </div>
                <div className="form-group">
                    <input type="text" className="form-control"
                        name="verse number"
                        placeholder="Verse number"
                        required={true}
                />
                </div>
                <div className="form-group">
                    <textarea id="form7" className="md-textarea form-control" rows={4}
                        name="verse"
                        placeholder="Verse context"
                    />
                </div>
            </div>
        )
    }
}

export default AddBibleSection;

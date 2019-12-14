import * as React from 'react';
import EditBibleSectionProps from '../../../interfaces/Question/EditBibleSectionProps.interface';
import './_style.css'
import { connect } from "react-redux";
import { startAddBibleverse, startEditBibleverse } from "../../../actions/biblelist";

export class EditBibleSection extends React.Component<any, EditBibleSectionProps> {
    constructor(props: EditBibleSectionProps){
        super(props);

        this.state = {
            book_name : '',
            chapter_number: null,
            verse_number: '',
            verse_context: ''
        };
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

    public onAddVerse = (e) => {
        const biblelist = {
            book_name: this.state.book_name,
            chapter_number: this.state.chapter_number,
            verse_number: this.state.verse_number,
            verse_context: this.state.verse_context
        }
        this.props.startAddBibleverse(biblelist);
    }
    
    public onDeleteVerse = (id) => {
        this.props.startRemoveBibleverse(id);
    }

    public onEditVerse = (bibleverse) => {
        this.props.startEditBibleverse(bibleverse);
    }

    public render() {
        return (
            <div>
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
                            placeholder="Verse context"
                            value={this.state.verse_context}
                            onChange={this.onChangeVerseContext}
                        />
                    </div>
                </div>
                <div className="verseactions">
                    <button className="btn" name="deleteverse" onClick={this.onDeleteVerse}><i className="fa fa-trash"/></button>                
                    <label>
                        <input type="checkbox" className="bigcheck" value="yes" onClick={this.onAddVerse}/>
                        <span className="bigcheck-target"/>
                    </label>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
      biblelist: state.biblelist
    }
}

const mapDispatchToProps = (dispatch, props) => ({
    startAddBibleverse: bibleverse => dispatch(startAddBibleverse(bibleverse)),
    startEditBibleverse: bibleverse => dispatch(startEditBibleverse(bibleverse)),
});
  
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditBibleSection);

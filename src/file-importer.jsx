import React, { Component } from 'react';
import FileUploader from './file-uploader/file-uploader.jsx';
import ProgramsList from './programs-list.jsx';

class FileImporter extends Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <div>
                Import Images<br/>
                You can import either individual JPG files or ZIP files containing multiple JPGs.<br/>
                <br/>
                <ProgramsList apiroot={this.props.apiroot}/>
                <FileUploader apiroot={this.props.apiroot}/>
            </div>
        )
    }
}

export default FileImporter;
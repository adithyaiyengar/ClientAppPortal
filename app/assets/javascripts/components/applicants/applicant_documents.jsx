/* Enum for accepted file types */
const FileInputs = {
    RESUME  : "application/pdf",
    PICTURE : "image/*"
}

/* Text to display before user has uploaded a file */
const DEFAULT_FILE = "Choose a File";

/* Text to display when uploading file */
const UPLOAD_TEXT = "Uploading...";

/**
 * @prop applicant - information about this applicant
 * @prop onUpload  - callback function on file upload
 */
class ApplicantDocuments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resumeFile  : DEFAULT_FILE,
            pictureFile : DEFAULT_FILE
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            resumeFile  : nextProps.applicant.resumeFile || this.state.resumeFile,
            pictureFile : nextProps.applicant.pictureFile || this.state.pictureFile
        });
    }

    _renderDocumentViewer(attribute) {
        if (this.props.applicant[attribute]) {
            return (
                <a href={this.props.applicant[attribute]} target="_blank"
                    className="upload-view-link">
                    { `View uploaded ${attribute}` }
                </a>
            );
        }
    }

    _hasSubmit = (attribute) => {
        return this.state[`${attribute}File`] !== DEFAULT_FILE;
    }

    _handleFileSelect = (e) => {
        const filename = $(e.target).val().split("\\").pop();
        const attribute = $(e.target).attr("name");
        if (filename) { // Do nothing on cancel
            this.setState({ [`${attribute}File`] : UPLOAD_TEXT });
            this.props.onUpload(e, filename);
        }
    }

    _uploadIcon = (attribute) => {
        return this._hasSubmit(attribute) ? "fa-check-circle-o" : "fa-upload";
    }

    render() {
        return (
            <div></div>
        );
    }
}

ApplicantDocuments.propTypes = {
    applicant : React.PropTypes.object.isRequired,
    onUpload  : React.PropTypes.func.isRequired
};

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { 
  Button, 
  Avatar, 
  TextField, 
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  Box,
  CircularProgress
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import UpdateButton from '../components/UpdateButton';
import DeleteButton from '../components/DeleteButton';
// import Loading from '../components/Loading';
import Title from '../components/Title';

import * as FileContext from '../contexts/file';
import * as UserContext from '../contexts/user';

class Files extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uploadedFile: null,
      fileMessage: null
    };
  }  

  componentWillMount() {
    this.props.getFiles()
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.files.fileMessage !== this.props.files.fileMessage) {
      this.setState({fileMessage: this.props.files.fileMessage});
    }
  }

  componentWillUnmount() {
    if (this.state.uploadedFile || this.state.fileMessage) {
      this.props.clearFileState();
    }
  }

  render() {
    const {files, gettingFiles} = this.props.files;
    const {uploadedFile, fileMessage} = this.state;
    if (gettingFiles) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center">
          <CircularProgress/>
        </Box>
      );
    } else {
      return (
        <Container component="main" maxWidth="md">
          <Box display="flex" flexDirection="row" justifyContent="space-between" marginBottom="20px" marginTop="20px">
            <Dropzone onDrop={acceptedFiles => this.setState({uploadedFile: acceptedFiles[0]})}>
              {({getRootProps, getInputProps}) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                    <Button variant="contained" color="primary" component="span">
                      Select File
                    </Button>
                </div>
              )}
            </Dropzone>
            <Link color="primary" onClick={() => this.props.logOut(this.props.user.email)}>
              <Typography component="h3" variant="h6" color="primary">
                Sign Out
              </Typography>
            </Link> 
          </Box>
          {uploadedFile
            ? (
              <Box display="flex" flexDirection="row" marginBottom="20px" marginTop="20px">
                <Box marginRight={20}>
                <Button variant="contained" color="primary" component="span" 
                onClick={() => {
                  this.props.uploadFile(uploadedFile);
                  this.setState({uploadedFile: null});
                }}
                >
                  Upload File
                </Button>
                </Box>
                <Typography component="h4" variant="h6">
                  {uploadedFile.name}
                </Typography>
              </Box>
            ) : (
              <Box />
            )
          }

          <React.Fragment>
            <Title>Files</Title>
            <Table size="medium">
              <TableHead>
                <TableRow>
                  <TableCell>No.</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Delete File</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {files.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Link color="primary" href={row.filepath} target="_blank">{row.name}</Link>
                    </TableCell>
                    <TableCell align="right"><DeleteButton deleteFile={this.props.deleteFile} id={row.id}/></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </React.Fragment>
        {fileMessage 
          ? (
              <p>{fileMessage}</p>
          ) : null
        }
        </Container>
      );
    }
  }
}

const mapStateToProps = (state, ownProps) => ({
  user: state.user,
  files: state.files
});

const mapDispatchToProps = dispatch => ({
  getFiles: () => dispatch(FileContext.getFiles()),
  clearFileState: () => dispatch(FileContext.clearFileState()),
  uploadFile: (file) => dispatch(FileContext.uploadFile(file)),
  deleteFile: (id) => dispatch(FileContext.deleteFile(id)),
  logOut: (email) => dispatch(UserContext.logOut(email)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Files);
import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';

import Dropzone from 'react-dropzone';
import DatePicker from 'material-ui/DatePicker';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {grey500} from 'material-ui/styles/colors';
import {debounce} from 'throttle-debounce';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import { Redirect } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Primary from '../../Theme';


import firebase from '../../firebase';
import userStore from '../../stores/UserStore';

const defaultAnnouncement = {
  title: `This is header`,
  content: `> This is body`
}

const styles = {
  underlineStyle: {
    borderColor: Primary,
  },
  floatingLabelStyle: {
    color: grey500,
  },
  datePicker: {
    theme: getMuiTheme({
      datePicker: {
        selectColor: Primary
      },
      flatButton: {
        primaryTextColor: Primary
      }
    }),
    position: "col-md-3"
  },
  dropZone: {
    position: "col-md-3 pull-right"
  },
  publishButton: {
    marginTop: "20px"
  }
};
const rawPath = "Announcement_Raw_Data"
const announcementPath = "Announcement/admin"

class AnnouncementCreate extends Component {
  constructor(){
    super();
    this.state = {
      title: defaultAnnouncement.title,
      content: defaultAnnouncement.content,
      dialogOpen: false,
      startDate: new Date(),
      endDate: "",
      redirectToAnnouncement: false
    }
    this.debounceContent = this.debounceContent.bind(this);
    this.titleChange = this.titleChange.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.publish = this.publish.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChangeStartDate = this.handleChangeStartDate.bind(this);
    this.handleChangeEndDate = this.handleChangeEndDate.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }
  debounceTitle = debounce(300, (e) => {
    this.setState({
      title: e.target.value
    })
  })
  debounceContent = debounce(300, (e) => {
    this.setState({
      content: e.target.value
    })
  })

  titleChange(e) {
    e.persist()
    this.debounceTitle(e)
  }

  contentChange(e) {
    this.setState({
      content: e.target.value
    })
    // e.persist()
    // this.debounceContent(e)
  }

  publish(){
    const currentTime = new Date().getTime();
    let newAnnouncement = {
      title: this.state.title,
      content: this.state.content,
      author: userStore.displayName,
      startDate: this.state.startDate.valueOf(),
      endDate: this.state.endDate.valueOf()
    }
    if (this.state.startDate.getTime() > currentTime){ // scheduled for future
      let anmtRef = firebase.database().ref().child(rawPath)
      anmtRef.push(newAnnouncement)
    } else { // update for now
      let anmtRef = firebase.database().ref().child(announcementPath)
      anmtRef.push(newAnnouncement)
    }
    
    this.setState({
      dialogOpen: true
    })
  }

  handleClose(){
    this.setState({
      dialogOpen:false,
      redirectToAnnouncement: true
    });
  }

  disablePrevDates(startDate) { // prevent selecting endDate before startDate
    const startSeconds = Date.parse(startDate);
    return (date) => {
      return Date.parse(date) < startSeconds;
    }
  }
  handleChangeStartDate(event, date){
    this.setState({
      startDate: date,
    });
  };

  handleChangeEndDate(event, date){
    this.setState({
      endDate: date,
    });
  };

  handleTab(e){
    if (e.keyCode === 9) { // tab was pressed
      console.log(this.refs.input);
      e.preventDefault();
      let val = this.state.content,
          start = e.target.selectionStart,
          end = e.target.selectionEnd;
      this.setState({content: val.substring(0, start) + "\t" + val.substring(end)},
        () => {let contentnode = document.getElementById("content")
      contentnode.selectionStart = contentnode.selectionEnd = start + 1;} );

    }
  }

  onDrop(photos){
    let dt = new Date();
    let newdt = dt.getFullYear() + "-" + (dt.getMonth() + 1) + "-" + dt.getDate();// yy/mm/dd
    const ref = firebase.storage().ref()
    photos.forEach((photo) => {
      console.log(photo);
      let photoRef = ref.child("announcement_photos/" + newdt + "/" + photo.name);
      photoRef.put(photo)
      .then((snap) => {
        this.setState(prevState => ({
          content : prevState.content + `\n\n<img alt="${photo.name}" src="${snap.downloadURL}" width="50%">`
        }))
      })
    })
  }

  render(){
    const actions = [
      <FlatButton
        label="Complete"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
      <div>
        <div  style={{marginBottom: "10px"}}>
          <MuiThemeProvider>
            <div className="panel panel-default">
              <div className="panel-heading">
                <TextField
                  hintText="Please enter title here"
                  floatingLabelText="Announcement title"
                  floatingLabelFixed={true}
                  onChange={this.titleChange}
                  underlineFocusStyle={styles.underlineStyle}
                  floatingLabelStyle={styles.floatingLabelStyle}
                  fullWidth={true}
                />
                
              </div>
              <div className="panel-body">
                <TextField
                  id="content"
                  hintText="You can use markdown syntax here to edit annoucement content"
                  floatingLabelText="**bold** _italics_ # header `code` ```preformatted``` >quote"
                  multiLine={true}
                  rows={4}
                  ref="input"
                  onChange={this.contentChange}
                  onKeyDown={this.handleTab.bind(this)}
                  underlineFocusStyle={styles.underlineStyle}
                  floatingLabelStyle={styles.floatingLabelStyle}
                  fullWidth={true}
                  value={this.state.content}
                />
              </div>
              
            </div>
          </MuiThemeProvider>
          <div className="row">
            <div className={styles.datePicker.position}>
            <MuiThemeProvider muiTheme={styles.datePicker.theme}>
              <div >
                <DatePicker
                  onChange={this.handleChangeStartDate}
                  floatingLabelText="Start Date"
                  defaultDate={this.state.startDate}
                  container="inline"
                />
                <DatePicker
                  onChange={this.handleChangeEndDate}
                  floatingLabelText="End Date"
                  container="inline"
                  shouldDisableDate={this.disablePrevDates(this.state.startDate)}
                />
              </div>
            </MuiThemeProvider>
            </div>
            <div className={styles.dropZone.position}>
              <Dropzone
                accept="image/jpeg, image/png, image/gif"
                onDrop={this.onDrop}
              >
                {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                  if (isDragActive) {
                    return "This file type is valid";
                  }
                  if (isDragReject) {
                    return "This file type is not valid";
                  }
                  return acceptedFiles.length || rejectedFiles.length
                    ? `Accepted ${acceptedFiles.length}, rejected ${rejectedFiles.length} files`
                    : "Upload local images via drop/click.";
                }}
              </Dropzone>
            </div>
          </div>
          <div className="row" style={styles.publishButton}>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <RaisedButton className="pull-right" label = "Publish"  backgroundColor = {Primary} onClick={this.publish} />
            </MuiThemeProvider>
          </div>
          
        </div>
        {/* <br /> */}
        <h4>Preview:</h4>
        <div className="panel panel-default">
          <div className="panel-heading"><h4>{this.state.title}</h4> </div>
          <div className="panel-body">
            {/* <h4><span className="label label-warning pull-right">{this.state.startDate} -- by {userStore.displayName}</span></h4> */}
            <ReactMarkdown source={this.state.content} renderers={{Link: props => <a href={props.href} target="_blank">{props.children}</a>}}/>
          </div>
        </div>
        <MuiThemeProvider>
         <Dialog
            title="Announcement Published!"
            actions={actions}
            modal={false}
            open={this.state.dialogOpen}
            onRequestClose={this.handleClose}
          >
            You can go to the annoucement page to check
          </Dialog>
        </MuiThemeProvider>
        {this.state.redirectToAnnouncement && (
          <Redirect to={"/announcement"}/>
        )}
      </div>
    )
  }
}

export default AnnouncementCreate;

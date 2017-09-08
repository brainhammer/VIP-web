import React, { Component } from 'react';
import userStore from '../../stores/UserStore';
//Material UI ELEMENTS
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

//Style sheet
import '../../style/projectpage.css';
import {Link} from 'react-router-dom';  
//Firebase init
import firebase from "../../firebase";

const style = {
  projectTitle: {
    color: "#8C1D40"
  },
  heading:{
    color: "#FFC627"
  },  
}

class ProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      problemAddressed:'',
      projectDescription:'',
      name:'',
      email:'',
      contactPerson:'',
      contactEmail:'',
      studentOpportunities: '',
      industryLeader:'',
      industryEmail:'',
      title: '',
      teamName:'',
      subtitle: '',
      topics: [],
      sections: [],
      fbkey: this.props.match.params.projectId
    };
  }

  componentDidMount() {
    
    firebase.database().ref(`Teams/${this.state.fbkey}`).once('value').then( (snap) => {
      let topics = [];
      let sections = [];
      for(let i in snap.val().topics) {
        topics.push(snap.val().topics[i]);
      }

      for(let i in snap.val().sections) {
        sections.push(snap.val().sections[i]);
      }

      this.setState({
        problemAddressed:snap.val().problemAddressed,
        projectDescription:snap.val().projectDescription,
        name: snap.val().name,
        email: snap.val().email,
        contactPerson:snap.val().contactPerson,
        contactEmail:snap.val().contactEmail,
        studentOpportunities: snap.val().studentOpportunities,
        industryLeader:snap.val().industryLeader,
        industryEmail:snap.val().industryEmail,
        teamName: snap.val().teamName,
        title: snap.val().title,
        subtitle: snap.val().subtitle,
        topics: topics,
        sections: sections,
        image: snap.val().logo
      });
    });
  }
  render() {
    let topics = this.state.topics.map((topics,index) =>
      <li key={index}>{topics}</li>
    )
    let sections = this.state.sections.map((sections,index) =>
      <div key={index}>
        <h4>{sections.title}</h4>
        {sections.content}
      </div>
    )
    return (
      <div className = "row">
        <MuiThemeProvider>
          <div>
            <h1 style={style.projectTitle}>{this.state.title}</h1>
            <h3 style={style.heading}>The Problem</h3>
            <img src={'Teams/'+this.state.fbkey+'/logo'}/>
            <div>{this.state.problemAddressed}</div>
            <h3 style={style.heading}>What is this project?</h3>
            <div>{this.state.projectDescription}</div>
            <h3 style={style.heading}>What students can do</h3>
            <div>{this.state.studentOpportunities}</div>
            <h3 style={style.heading}>Faculty</h3>
            <div>{this.state.name}, <a href={"mailto:"+this.state.email}>{this.state.email}</a></div>
            <h3 style={style.heading}>Contact</h3>
            <div>{this.state.contactPerson}, {this.state.contactEmail}</div>
            {(this.state.industryLeader!=null) &&
              <div>
                <h3 style={style.heading}>Industry Project Leaders</h3>
                <div>{this.state.industryLeader}, {this.state.industryEmail}</div>
              </div>
            }
            {(userStore.role === "advisor" || userStore.role === "student") &&
            <div className="row">
            <Link to={`${this.state.fbkey}/apply`}>
            <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
              <RaisedButton label = "apply" id = "applyButton" backgroundColor = "#ffc425" style = {{float: "right", margin:"10"}}/>
            </MuiThemeProvider>
            </Link>
            </div>
            }
          </div>
        </MuiThemeProvider>
      </div>
  );
  }
}

export default ProjectPage;
import React, { Component,Alert } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Card, CardTitle} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ASUTeamLogoUpload from './ASUTeamLogoUpload';
import Bootstrap from './Bootstrap';

import * as firebase from 'firebase';



const TeamFormPath = 'Teams';


const style = {
  margin: 12,
};

class ASUTeamFormComponent extends Component{
  constructor(props) {
      super(props);
      this.state = {
            teamName: '',
            subtitle: '',
            topics: '',
            advisors: '',
            desc: '',
            major: '',
            requirements: '',
            members: '',
            name: '',
            email: '',
            status: '',
            teamLogo: '',
            sectionsT: '',
            sectionsC: '',
      };
    }

    getdata =(childdata) =>{
      this.setState({
        teamLogo: childdata,
      });
    }

   handleTopicArray = (event) => {
     var str = event.target.value;
     var res=str.split(",");
     this.setState({
        topics : res,
      })
    }


  firebasewrite = () => {
    const rootRef = firebase.database().ref().child(TeamFormPath);
    rootRef.push({
        title : this.state.teamName,
        subtitle : this.state.subtitle,
        topics : this.state.topics,
        advisors : this.state.advisors,
        desc : this.state.desc,
        major : this.state.major,
        requirements : this.state.requirements,
        members : this.state.members,
        name : this.state.name,
        email : this.state.email,
        status : this.state.status,
        logo: this.state.teamLogo,
        sections: [{'content':this.state.sectionsC,'title': this.state.sectionsT}],
    });
    this.setState({
          teamName: '',
          subtitle: '',
          topics: '',
          advisors: '',
          desc: '',
          major:'',
          requirements:'',
          members:'',
          name:'',
          email:'',
          status:'',
          teamLogo: '',
          sectionsC: '',
          sectionsT: '',


    });

  }

	render(){
		return (
			<div style={{margin: 'auto',textAlign: 'center'}}>
		        <MuiThemeProvider>
            <div>
              <Card>
                <CardTitle title='Team Apply Form' />
                 <TextField
                    style={{width: '50%'}}
                    ref = "teamName"
                    name = '1'
                    floatingLabelFixed={true}
                    hintText="Team"
                    floatingLabelText="Enter Team name"
                    value={this.state.teamName} onChange={(event) => { this.setState({ teamName : event.target.value })}}
                  /><br/>
                  <TextField
                    ref = "subtitle"
                    style={{width: '50%'}}
                    name = '2'
                    floatingLabelFixed={true}
                    hintText="Subtitle"
                    floatingLabelText="Enter subtitle"
                    value={this.state.subtitle} onChange={(event) => { this.setState({ subtitle : event.target.value })}}
                  /><br/>
                  <TextField
                    ref = "topics"
                    style={{width: '50%'}}
                    name = '3'
                    floatingLabelFixed={true}
                    hintText="Topics"
                    floatingLabelText="Enter topics"
                    value={this.state.topics} onChange={this.handleTopicArray}
                  /><br/>
                  <TextField
                    ref = "advisors"
                    style={{width: '50%'}}
                    name = '4'
                    floatingLabelFixed={true}
                    hintText="Advisors"
                    floatingLabelText="Enter advisor names"
                    value={this.state.advisors} onChange={(event) => { this.setState({ advisors : event.target.value })}}
                  /><br/>
                  <TextField
                    ref = "major"
                    style={{width: '50%'}}
                    name = '6'
                    floatingLabelFixed={true}
                    hintText="Major"
                    floatingLabelText="Enter major"
                    value={this.state.major} onChange={(event) => { this.setState({ major : event.target.value })}}
                  /><br/>
                  <TextField
                     style={{width: '50%'}}
                     ref = "sections title"
                     name = '13'
                     floatingLabelFixed={true}
                     hintText="Section Title"
                     floatingLabelText="Enter the section title"
                     value={this.state.sectionsT} onChange={(event) => { this.setState({ sectionsT : event.target.value })}}
                   /><br/>
                  <TextField
                     style={{width: '50%'}}
                     ref = "sections content"
                     name = '12'
                     floatingLabelFixed={true}
                     hintText="Section Content"
                     floatingLabelText="Enter the section content"
                     value={this.state.sectionsC} onChange={(event) => { this.setState({ sectionsC : event.target.value })}}
                   /><br/>
                  <TextField
                    ref = "members"
                    style={{width: '50%'}}
                    name = '8'
                    floatingLabelFixed={true}
                    hintText="Team Members"
                    floatingLabelText="Enter team members"
                    value={this.state.members} onChange={(event) => { this.setState({ members : event.target.value })}}
                  /><br/>
                  <TextField
                    ref = "name"
                    style={{width: '50%'}}
                    name = '9'
                    floatingLabelFixed={true}
                    hintText="Name"
                    floatingLabelText="Enter name"
                    value={this.state.name} onChange={(event) => { this.setState({ name : event.target.value })}}
                  /><br/>
                  <TextField
                    ref = "email"
                    style={{width: '50%'}}
                    name = '10'
                    floatingLabelFixed={true}
                    hintText="Email"
                    floatingLabelText="Enter email"
                    value={this.state.email} onChange={(event) => { this.setState({ email : event.target.value })}}
                  /><br/>
                  <TextField
                    ref = "status"
                    style={{width: '50%'}}
                    name = '11'
                    floatingLabelFixed={true}
                    hintText="Status"
                    floatingLabelText="Enter status"
                    value={this.state.status} onChange={(event) => { this.setState({ status : event.target.value })}}
                  /><br/>
                  <TextField
                    ref = "requirements"
                    style={{width: '80%'}}
                    name = '7'
                    floatingLabelFixed={true}
                    hintText="Requirements"
                    multiLine={true}
                    rows={4}
                    rowsMax={6}
                    value={this.state.requirements} onChange={(event) => { this.setState({ requirements : event.target.value })}}
                  /><br/>
                  <TextField
                    ref = "desc"
                    style={{width: '80%'}}
                    name = '5'
                    floatingLabelFixed={true}
                    hintText="Description"
                    multiLine={true}
                    rows={4}
                    rowsMax={6}
                    value={this.state.desc} onChange={(event) => { this.setState({ desc : event.target.value })}}
                  /><br/>
                </Card>
                  <br/>
                  <ASUTeamLogoUpload childdata = {this.getdata}/>
                  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                  <div>
                    <RaisedButton label="Apply"  style={style} backgroundColor='#ffc627' onClick={this.firebasewrite}
                    data-toggle="modal" data-target="#myModal" /> <br />
                  </div>
                  </MuiThemeProvider>

            </div>
		        </MuiThemeProvider>

            <Bootstrap />
		  </div>
				)
	}
}



export default ASUTeamFormComponent;
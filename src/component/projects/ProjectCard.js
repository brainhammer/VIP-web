import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardActions, CardMedia, CardTitle, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Vip_logo from '../../assets/Vip_logo.png';


import { Link, Route } from 'react-router-dom';

const style = {
  card: {
    paddingBottom: "10px",
    margin: "10px",
    height: "380px"
  },
  cardMedia:{
    height: "100px",
  },
  cardHeader: {
    textAlign : 'left',
    fontSize: '1.2em',
    maxHeight: "100px"
  },
  cardText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    height: "140px"
  }
  
}

class ProjectCard extends Component {
    constructor(props) {
      super(props);
      
    }
    render () {
      return (
        <MuiThemeProvider>
          <div className="col-md-4" style={{marginBottom:"10px"}}>
          <Card style={style.card}>
            <CardHeader
              title={this.props.project.teamName}
              subtitle={this.props.project.subtitle}
              actAsExpander={false}
              showExpandableButton={false}
              titleStyle = {style.cardHeader}
            />
            <CardMedia style={style.cardMedia}>
              {this.props.project.logo
              ?<img src={this.props.project.logo} alt="" style = {style.cardMedia}/>
              :<img src={Vip_logo} alt="" style = {style.cardMedia}/>
              }
            </CardMedia>
            {/* <CardText expandable={false} style={style.cardText}>
              {this.props.project.nature}
            </CardText> */}
              <CardActions>
                <Link to={`projects/${this.props.fbkey}`}><FlatButton label="Learn more" /></Link>                
              </CardActions>
          </Card>
          </div>
        </MuiThemeProvider>
      )
    }
}

export default ProjectCard;
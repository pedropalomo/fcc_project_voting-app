import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPoll, sendVote, addNewOption, deletePoll } from '../actions/index';
import { Link } from 'react-router';
import {Pie} from 'react-chartjs-2';


class PollShow extends Component {
  static contextTypes = {
    router: PropTypes.object
  };
  
  //----------------------------------------------------------------------------
  constructor(props) {
    super(props);

    this.state = {option_selected: '',
                  add_option_input : false
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }
  
  //----------------------------------------------------------------------------
  componentWillMount() {
    this.props.fetchPoll(this.props.params.id);
  }

  //----------------------------------------------------------------------------
  onDeleteClick() {
    this.props.deletePoll(this.props.params.id);
  }

  //----------------------------------------------------------------------------
  renderDeleteButton() {
    
    console.log("renderDeleteButton: ", this.props.authenticated, this.props.poll.user, this.props.user);
    
    if (this.props.authenticated && 
        (this.props.poll.user == this.props.user)) {
          
        console.log("renderDeleteButton 2: ", this.props.authenticated, this.props.poll.user == this.props.user);
          
      return (
          <button
            className="btn btn-danger button_delete center-block"
            onClick={this.onDeleteClick.bind(this)}>
            Delete Poll
          </button>
        );
    }
  }
  
  //----------------------------------------------------------------------------
  renderPollPieChart() {

     var pieOptions = {
       animatable: true,
     };

     var data = {
       labels: [],
       datasets: [{
         data: [],
         backgroundColor: [],
         hoverBackgroundColor: []
       }]
     };

    this.props.poll.options.map(option => {data.labels.push(option)});
    this.props.poll.votes.map(number => {data.datasets[0].data.push(number)});
    this.props.poll.color.map(clr => { 
      data.datasets[0].backgroundColor.push(clr);
      data.datasets[0].hoverBackgroundColor.push(clr);   
    });

    return (<div>
            <Pie data={data} options={pieOptions}/>
            <br/>
            {this.renderDeleteButton()}
            </div>)
  }

  //----------------------------------------------------------------------------
  onFormSubmit(event) {
    event.preventDefault();

    if (!this.state.option_selected)
    {
      alert('onFormSubmit: insert option');
    } else {

     var user_or_ip = '';
     if (this.props.user == null) {
       user_or_ip = this.props.ip;
     } else {
       user_or_ip = this.props.user;
     } 

     var is_element = this.props.poll.user_vote.find ((el) => {return el == user_or_ip});

     console.log("find element: ", is_element);

     if (is_element == undefined){
       this.state.add_option_input = false;      
       this.props.sendVote(this.props.poll._id, 
                           this.state.option_selected,
                           user_or_ip);   
       this.forceUpdate(); // necessary because the update of the props is not calling to render
     } else {
       alert ("only one vote per user!!");
     }
    }
  }

  //----------------------------------------------------------------------------
  onInputChange(event) {
     this.setState({ option_selected: event.target.value});

     if (event.target.value == "new_option")
     {
        this.state.add_option_input = true;
     }
  }

  //----------------------------------------------------------------------------
  renderOptions() {
     return this.props.poll.options.map ((option) => {
        return <option value={option}>{option}</option>
      })
  }
  
  //----------------------------------------------------------------------------
  insertNewOption() {
    if (this.state.add_option_input == true) {
       return (<div>
              <input className="button_submit" type="text" value={this.state.option_value} onChange={this.onInputChange}/>
              </div>);
    }
  }

  //----------------------------------------------------------------------------
  enterVote() {
    return (
      <form  onSubmit={this.onFormSubmit}>
        <label>
        Pick your favourite option:   
        <br/>
        <select id="soflow" 
                value={this.state.option_selected} 
                onChange={this.onInputChange}>
        
        <option value="" hidden> -- select an option -- </option>
        {this.renderOptions()}
        <option value="new_option">Insert other option...</option>
        </select>
        {this.insertNewOption()}
        </label>
        <br/>
        <button type="submit" className="button_submit btn btn-success">Vote!</button>
      </form>)
  }

  //----------------------------------------------------------------------------


  render() {
    const { poll, user } = this.props;

    if (!poll) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <br/>
        <Link to="/polls">Back To Index</Link>
        <h3>{poll.tittle}</h3>
        <div className="row">
        <div className="col-sm-4">{this.enterVote()}</div>
        <div className="col-sm-8">{this.renderPollPieChart()}</div>
        </div>
        <div>
          <button className="btn"> <a className="twitter-share-button" href="https://twitter.com/intent/tweet?text=Hello%20world" data-size="large">
          Tweet </a></button>
        </div>
      </div>
    );

  }
}

// <a class="twitter-share-button"
//   href="https://twitter.com/intent/tweet?text=Hello%20world"
//   data-size="large">
// Tweet</a>


// <a href="https://twitter.com/share" class="twitter-share-button" data-size="large" data-show-count="false">Tweet</a>
// <script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script> 

  //----------------------------------------------------------------------------
function mapStateToProps(state) {
  return { poll: state.auth.poll,
           user: state.auth.user,
           authenticated: state.auth.authenticated,
           ip: state.auth.ip
  };
}

export default connect(mapStateToProps, { fetchPoll, sendVote, addNewOption, deletePoll })(PollShow);

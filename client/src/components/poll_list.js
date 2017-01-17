import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPolls } from '../actions/index';
import { Link } from 'react-router';

class PollList extends Component {
    
     componentWillMount() {
      this.props.fetchPolls();
    }
    
    renderPollList () {
        if (!this.props.poll_list) {
            return;
        }
        
        return this.props.poll_list.map ((poll) => {
                 return ( 
                 <li className="list-group-item" key={poll._id}>
                   <Link to={"poll/" + poll._id}>
                     <span className="pull-right">{poll.user}</span>
                     <strong>{poll.title}</strong>
                   </Link>                   
                 </li>
                )
        })
    }
    
    render () {
     return (
        <div>
        <h3>Polls</h3>
        <ul className="list-group">
          {this.renderPollList()}
        </ul>
      </div>
      );
    }
}

function mapStateToProps(state) {
  return { poll_list: state.auth.poll_list,
           user: state.auth.user};
}

// included short-cut to avoid put the function mapDispatchtoProps()
export default connect(mapStateToProps, { fetchPolls })(PollList);






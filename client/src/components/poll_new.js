import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { newPoll } from '../actions/index';
import { Link } from 'react-router';

class PollNew extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.newPoll(this.props.user, props);
  }

  render() {
    const { fields: { title, options }, handleSubmit } = this.props;

    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Poll</h3>

      <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

      <div className={`form-group ${options.touched && options.invalid ? 'has-danger' : ''}`}>
          <label>Categories</label>
          <input type="text" className="form-control" {...options} />
          <div className="text-help">
            {options.touched ? options.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a title';
  }
  if (!values.options) {
    errors.options = 'Enter options';
  }

  return errors;
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps

function mapStateToProps(state) {
  return {user: state.auth.user};
}

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'options'],
  validate
}, mapStateToProps, { newPoll })(PollNew);
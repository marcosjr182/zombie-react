import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SignInForm = props => {
  const { handleSubmit } = props;
  return (
    <form className="navbar-form " onSubmit={handleSubmit}>
      <Field name='id' component='input' type='text' className=' form-control' />
      <button className="btn btn-default btn-navbar" type="submit">Sign In</button>
    </form>
  )
}

export default reduxForm({
  form: 'sign-in'
})(SignInForm)

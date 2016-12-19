import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { signIn } from '../actions/survivor-actions';

const SignInForm = ({ handleSubmit }) =>
  <form className="navbar-form " onSubmit={handleSubmit}>
    <Field name='id' component='input' type='text' className=' form-control' />
    <button className="btn btn-default btn-navbar" type="submit">Sign In</button>
  </form>

const onSubmit = (values, dispatch) =>
  dispatch(signIn(values.id))


export default reduxForm({
  form: 'sign-in',
  onSubmit
})(SignInForm)

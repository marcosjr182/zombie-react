import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { addSurvivor } from '../ducks/my-survivor'
import { updatableSurvivor, stringifyItems } from '../helpers'

const AddSurvivorForm = ({ handleSubmit }) =>
  <form onSubmit={handleSubmit}>
    <div className="col-xs-12 form-group">
      <label className="col-xs-12" htmlFor="name">Name</label>
      <Field name='name' component='input' type='text' className='form-control' />
    </div>
    <div className="col-xs-6 form-group">
      <label className="col-xs-12" htmlFor="age">Age</label>
      <Field name='age' component='input' type='text' className='form-control' />
    </div>
    <div className="col-xs-6 form-group">
      <label className="col-xs-12" htmlFor="gender">Gender</label>
      <Field name='gender' component='select' defaultValue='female' className='form-control'>
        <option></option>
        <option value="M">MALE</option>
        <option value="F" htmlSelected>FEMALE</option>
      </Field>
    </div>
    <div className="col-xs-12 form-group items">
      <div className="col-xs-6">
        <label className="col-xs-12" htmlFor="Water">Water</label>
        <Field name='Water' component='input' type='text' className='form-control' />
      </div>
      <div className="col-xs-6">
        <label className="col-xs-12" htmlFor="Food">Food</label>
        <Field name='Food' component='input' type='text' className='form-control' />
      </div>
      <div className="col-xs-6">
        <label className="col-xs-12" htmlFor="Ammunition">Ammunition</label>
        <Field name='Ammunition' component='input' type='text' className='form-control' />
      </div>
      <div className="col-xs-6">
        <label className="col-xs-12" htmlFor="Medication">Medication</label>
        <Field name='Medication' component='input' type='text' className='form-control' />
      </div>
    </div>
    <div className="col-xs-12 form-footer text-right">
      <button className="btn btn-default" type="submit">Save Survivor</button>
    </div>
  </form>

const onSubmit = (values, dispatch) =>
  dispatch(addSurvivor({
    ...updatableSurvivor(values),
    items: stringifyItems(values)
  }))

export default reduxForm({
  form: 'add-survivor',
  onSubmit
})(AddSurvivorForm);

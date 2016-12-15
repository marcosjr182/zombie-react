import React from 'react';
import { Field, reduxForm } from 'redux-form';

class AddSurvivorForm extends React.Component {
  render() {
    const { handleSubmit } = this.props;
    return (
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
          <Field name='gender' component='select' className='form-control'>
            <option value="M">MALE</option>
            <option value="F">FEMALE</option>
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
    )
  }
}

AddSurvivorForm = reduxForm({
  form: 'add-survivor'
})(AddSurvivorForm);

export default AddSurvivorForm

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';

const TradeForm = ({ handleSubmit }) =>
  <form onSubmit={handleSubmit}>
    <div className="col-xs-12 form-group items">
      <div className="col-xs-3">
        <label className="col-xs-12" htmlFor="Water">Water</label>
        <Field name='Water' component='input' type='text' className='form-control' />
      </div>
      <div className="col-xs-3">
        <label className="col-xs-12" htmlFor="Food">Food</label>
        <Field name='Food' component='input' type='text' className='form-control' />
      </div>
      <div className="col-xs-3">
        <label className="col-xs-12" htmlFor="Ammunition">Ammunition</label>
        <Field name='Ammunition' component='input' type='text' className='form-control' />
      </div>
      <div className="col-xs-3">
        <label className="col-xs-12" htmlFor="Medication">Medication</label>
        <Field name='Medication' component='input' type='text' className='form-control' />
      </div>
    </div>
    <div className="col-xs-12 form-footer text-right">
      <Link to="/list" className="btn btn-default">Back to List</Link>
      <button className="btn btn-default" type="submit">Save Survivor</button>
    </div>
  </form>

export default reduxForm({
  form: 'trade'
})(TradeForm)

import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';

const PropertyField = ({type, name}) =>
  <div className="col-xs-3">
    <label className="col-xs-12" htmlFor={`${name}`}>{name}</label>
    <Field name={`${type}.${name}`} component='input' type='number' className='form-control' />
  </div>

const TradeForm = ({ handleSubmit, survivorName }) =>
  <form onSubmit={handleSubmit}>
    <div className="col-xs-6 form-group items wanted-items">
      <div class="col-xs-12"><h2>Wanted</h2></div>
      <PropertyField type='wanted' name='Water' />
      <PropertyField type='wanted' name='Food' />
      <PropertyField type='wanted' name='Ammunition' />
      <PropertyField type='wanted' name='Medication' />
    </div>
    <div className="col-xs-6 form-group items payment-items">
      <div class="col-xs-12"><h2>Payment</h2></div>
      <PropertyField type='payment' name='Water' />
      <PropertyField type='payment' name='Food' />
      <PropertyField type='payment' name='Ammunition' />
      <PropertyField type='payment' name='Medication' />
    </div>
    <div className="col-xs-12 form-footer text-right">
      <Link to="/list" className="btn btn-default">Back to List</Link>
      <button className="btn btn-default" type="submit">Save Survivor</button>
    </div>
  </form>

const onSubmit = ({ payment, wanted }, dispatch, { survivorName }) =>
  dispatch(offerTrade({
    consumer: {
      name: survivorName,
      pick: stringifyItems(payment),
      wanted: stringifyItems(wanted)
    }
  }));

const initialValues = {
  wanted: {
    Water: 0,
    Food: 0,
    Ammunition: 0,
    Medication: 0
  },
  payment: {
    Water: 0,
    Food: 0,
    Ammunition: 0,
    Medication: 0
  }
}

export default reduxForm({
  form: 'trade',
  onSubmit,
  initialValues
})(TradeForm)

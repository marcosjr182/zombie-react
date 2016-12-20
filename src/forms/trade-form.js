import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { offerTrade } from  '../actions/survivor-actions';
import { stringifyItems } from  '../helpers';

const propertyField = ({input, label, type, name, meta: { touched, error } }) =>
  <div className="col-xs-3">
    <label className="col-xs-12" htmlFor={`${name}`}>{label}</label>
    <input className='form-control' {...input} type={type}/>
    {touched && (error && <span>{error}</span>)}
  </div>

const TradeForm = ({ handleSubmit, survivor }) =>
  <form onSubmit={handleSubmit}>
    <div className="col-xs-6 form-group wanted-items">
      <div className="col-xs-12"><h2>Wanted</h2></div>
      <Field component={propertyField} type='number' label='Water' name='wanted.Water' />
      <Field component={propertyField} type='number' label='Food' name='wanted.Food' />
      <Field component={propertyField} type='number' label='Ammunition' name='wanted.Ammunition' />
      <Field component={propertyField} type='number' label='Medication' name='wanted.Medication' />
    </div>
    <div className="col-xs-6 form-group payment-items">
      <div className="col-xs-12"><h2>Payment</h2></div>
      <Field component={propertyField} type='number' label='Water' name='payment.Water' />
      <Field component={propertyField} type='number' label='Food' name='payment.Food' />
      <Field component={propertyField} type='number' label='Ammunition' name='payment.Ammunition' />
      <Field component={propertyField} type='number' label='Medication' name='payment.Medication' />
    </div>
    <div className="col-xs-12 form-footer text-right">
      <Link to="/list" className="btn btn-default">Back to List</Link>
      <button className="btn btn-default" type="submit">Save Survivor</button>
    </div>
  </form>

const onSubmit = ({ payment, wanted }, dispatch, { survivor }) =>
  dispatch(
    offerTrade(
      survivor.id,
      { consumer: {
          name: survivor.name,
          pick: stringifyItems(payment),
          wanted: stringifyItems(wanted)
        }
      }
  ));

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

const isNegative = value =>
  (value < 0)

const validatePositive = value =>
  isNegative(value)
    ? 'Required and can not be negative'
    : undefined

const validate = ({wanted, payment}) => ({
  wanted: {
    Water: validatePositive(wanted.Water),
    Food: validatePositive(wanted.Food),
    Medication: validatePositive(wanted.Medication),
    Ammunition: validatePositive(wanted.Ammunition)
  },
  payment: {
    Water: validatePositive(payment.Water),
    Food: validatePositive(payment.Food),
    Medication: validatePositive(payment.Medication),
    Ammunition: validatePositive(payment.Ammunition)
  }
})

export default reduxForm({
  form: 'trade',
  onSubmit,
  initialValues,
  validate
})(TradeForm)

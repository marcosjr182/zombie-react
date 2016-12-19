import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';

const propertyField = ({input, type, name, meta: { touched, error } }) =>
  <div className="col-xs-3">
    <label className="col-xs-12" htmlFor={`${name}`}>{name.split('.').pop()}</label>
    <input className='form-control' {...input} type={type}/>
    {touched && (error && <span>{error}</span>)}
  </div>

const TradeForm = ({ handleSubmit, survivorName }) =>
  <form onSubmit={handleSubmit}>
    <div className="col-xs-6 form-group items wanted-items">
      <div class="col-xs-12"><h2>Wanted</h2></div>
      <Field component={propertyField} type='number' name='wanted.Water' />
      <Field component={propertyField} type='number' name='wanted.Food' />
      <Field component={propertyField} type='number' name='wanted.Ammunition' />
      <Field component={propertyField} type='number' name='wanted.Medication' />
    </div>
    <div className="col-xs-6 form-group items payment-items">
      <div class="col-xs-12"><h2>Payment</h2></div>
      <Field component={propertyField} type='number' name='payment.Water' />
      <Field component={propertyField} type='number' name='payment.Food' />
      <Field component={propertyField} type='number' name='payment.Ammunition' />
      <Field component={propertyField} type='number' name='payment.Medication' />
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

const validate = values => {
  const errors = { wanted: {}, payment: {} },
        msg = 'Required and can not be negative';

  if (!values.wanted.Water || values.wanted.Water < 0) {
    errors.wanted.Water = msg
  }
  if (!values.wanted.Food || values.wanted.Food < 0) {
    errors.wanted.Food = msg
  }
  if (!values.wanted.Ammunition || values.wanted.Ammunition < 0) {
    errors.wanted.Ammunition = msg
  }
  if (!values.wanted.Medication || values.wanted.Medication < 0) {
    errors.wanted.Medication = msg
  }

  if (!values.payment.Water || values.payment.Water < 0) {
    errors.payment.Water = msg
  }
  if (!values.payment.Food || values.payment.Food < 0) {
    errors.payment.Food = msg
  }
  if (!values.payment.Ammunition || values.payment.Ammunition < 0) {
    errors.payment.Ammunition = msg
  }
  if (!values.payment.Medication || values.payment.Medication < 0) {
    errors.payment.Medication = msg
  }

  return errors;
}


export default reduxForm({
  form: 'trade',
  onSubmit,
  initialValues,
  validate
})(TradeForm)

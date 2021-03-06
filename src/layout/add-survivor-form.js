  import React from 'react';
  import { connect } from 'react-redux';
  import { addSurvivor } from '../actions/survivor-actions';

  class AddSurvivorForm extends React.Component {

  	constructor(props){
  		super(props);
      this.state = {
        name: '',
        age: '',
        gender: 'M',
        Water:'0',
        Food:'0',
        Ammunition:'0',
        Medication:'0'
      }
      this.onSubmit = this.onSubmit.bind(this);
      this.onChange = this.onChange.bind(this);
    }

  	onChange(evt) {
      this.setState({ [evt.target.name]: evt.target.value });
    }

    onSubmit(e) {
      e.preventDefault();
      const items = `Water:${this.state.Water};`
                  + `Food:${this.state.Food};`
                  + `Ammunition:${this.state.Ammunition};`
                  + `Medication:${this.state.Medication};`;

      this.props.dispatch(addSurvivor({
        person: {
          name: this.state.name,
          age: this.state.age,
          gender: this.state.gender
        },
        items: items
      }));
      this.props.toggleModal();
    }

    render() {
  		return (
  			<form onSubmit={this.onSubmit}>
          <div className="col-xs-12 form-group">
            <label className="col-xs-12" htmlFor="name">Name</label>
            <input id="name" name="name" type="text" className="form-control" onChange={this.onChange} value={this.state.name} />
          </div>
          <div className="col-xs-6 col-sm-4 form-group">
            <label className="col-xs-12" htmlFor="age">Age</label>
            <input id="age" name="age" type="number" className="form-control" onChange={this.onChange} value={this.state.age} />
          </div>
          <div className="col-xs-6 col-sm-4 form-group">
            <label className="col-xs-12" htmlFor="gender">Gender</label>
            <select id="gender" name="gender" type="text" className="form-control" onChange={this.onChange} value={this.state.gender}>
                <option value="M">MALE</option>
                <option value="F">FEMALE</option>
            </select>
          </div>
          <div className="col-xs-12 col-sm-4 form-group items">
            <div className="col-xs-6">
              <label className="col-xs-12" htmlFor="Water">Water</label>
              <input className="form-control" name="Water" type="number" onChange={this.onChange} value={this.state.Water} />
            </div>
            <div className="col-xs-6">
              <label className="col-xs-12" htmlFor="Food">Food</label>
              <input className="form-control" name="Food" type="number" onChange={this.onChange} value={this.state.Food} />
            </div>
            <div className="col-xs-6">
              <label className="col-xs-12" htmlFor="Ammunition">Ammunition</label>
              <input className="form-control" name="Ammunition" type="number" onChange={this.onChange} value={this.state.Ammunition} />
            </div>
            <div className="col-xs-6">
              <label className="col-xs-12" htmlFor="Medication">Medication</label>
              <input className="form-control" name="Medication" type="number" onChange={this.onChange} value={this.state.Medication} />
            </div>
          </div>
          <div className="col-xs-12 form-footer text-right">
            <button className="btn btn-default" type="submit">Save Survivor</button>
          </div>
        </form>
  		)
  	}
  }

  export default connect()(AddSurvivorForm)

import React from 'react'
import PropTypes from 'prop-types'
import {Picker} from 'react-native'

class YearPicker extends React.Component {
	/*
	* if intial value is set, set the form value on mount
	*/
	componentWillMount(){
		if(this.props.initialValue) {
			this.props.onChange(this.props.name, this.props.initialValue);
		}
	}
	/*
  * Custom on blur function.
  */
	onBlur() {
		if (this.props.onBlur) this.props.onBlur()
	}

  /*
  * Change the value of form component.
  *
  * @param [any] value. Set the value of the form component.
  */
	onChange(value) {
		this.props.onChange(this.props.name, value);
	}

	render(){
    const picker = this.props

    let years = [];
		for (let i= (picker.minYear || 1900); i < (picker.maxYear || 2200); i++){
			years.push(<Picker.Item key={`year${i}`} label={`${i}`} value={i} />);
		}

    return (
			<Picker
        style={picker.style}
        selectedValue={picker.value || picker.initialValue}
        onValueChange={(value)=> this.onChange(value)}
      >
				{years}
			</Picker>
		);
	}
}

YearPicker.propTypes = {
	intitialValue: PropTypes.number,
  maxYear: PropTypes.number,
  minYear: PropTypes.number,
	name: PropTypes.string,
	onChange: PropTypes.func,
  style:PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
	value: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string
	])
};

export default YearPicker;

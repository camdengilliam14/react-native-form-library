import React from 'react'
import PropTypes from 'prop-types'
import {Picker} from 'react-native'

class Select extends React.Component {
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

	/*
  * Render the picker options user gets to choose from.
  */
	renderPickerOptions(){
		return this.props.options.map((option, index) =>{
			return (
				<Picker.Item key={`option${index + 1}`} label={option.name} value={option.value || option.id || option.name} />
			);});
	}

	render(){
    const select = this.props
		return (
			<Picker
        style={select.style}
				selectedValue = {select.value}
				onValueChange = {(value)=> this.onChange(value)}
			>
				<Picker.Item key="option0" label={select.placeholder || 'Select...'} value={""}/>
				{this.renderPickerOptions()}
			</Picker>
		);
	}
}

Select.propTypes = {
	name: PropTypes.string,
	onBlur: PropTypes.func,
	onChange: PropTypes.func,
	options: PropTypes.array,
  style:PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
	value: PropTypes.any
}

export default Select

import React from 'react'
import PropTypes from 'prop-types'
import {Picker} from 'react-native'

class DayPicker extends React.Component {
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

		let days = [];
		for (let i=0; i<picker.maxDays; i++){
			days.push(<Picker.Item key={`day${i}`} label={`${i+1}`} value={i+1} />);
		}

    return (
			<Picker
        style={picker.style}
        selectedValue={picker.value}
        onValueChange={(value)=> this.onChange(value)}
      >
        {days}
			</Picker>
		);
	}
}

DayPicker.propTypes = {
  maxDays: PropTypes.number.isRequired,
	name: PropTypes.string,
	onChange: PropTypes.func,
  style:PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
	value: PropTypes.number
};

export default DayPicker;

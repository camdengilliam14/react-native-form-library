import React from 'react'
import PropTypes from 'prop-types'
import {Picker} from 'react-native'

const months = [
	{value: 1, name: 'January'},
	{value: 2, name: 'February'},
	{value: 3, name: 'March'},
	{value: 4, name: 'April'},
	{value: 5, name: 'May'},
	{value: 6, name: 'June'},
	{value: 7, name: 'July'},
	{value: 8, name: 'August'},
	{value: 9, name: 'September'},
	{value: 10, name: 'October'},
	{value: 11,name: 'November'},
	{value: 12,name: 'December'}
];

class MonthPicker extends React.Component {
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
    return (
      <Picker
        style={picker.style}
        selectedValue={picker.value}
        onValueChange={(value)=> this.onChange(value)}
      >
				{
					months.map((month, index) => {
						return <Picker.Item key={`month${index}`} label={month.name} value={month.value} />;
					})
				}
			</Picker>
		);
	}
}

MonthPicker.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
  style:PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
	value: PropTypes.number
};

export default MonthPicker;

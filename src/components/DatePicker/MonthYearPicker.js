import React from 'react'
import PropTypes from 'prop-types'
import {Picker, StyleSheet, View} from 'react-native'
import MonthPicker from './MonthPicker'
import YearPicker from './YearPicker'

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row'
  },
  container: {
    flex: 1
  }
});


class MonthYearPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initializeState();
  }

  /*
  * Initialize the state for the month year picker.
  */
  initializeState() {
    let date = new Date();
    let defaultValue = this.props.value ? this.props.value.split("-") : null;

		let year = date.getFullYear();
		let month = date.getMonth() + 1;

		if (defaultValue){
			year = defaultValue ? parseInt(defaultValue[0]) : year,
			month = defaultValue && defaultValue[1] ? parseInt(defaultValue[1]): month
		}

		return { year, month };
  }
	/*
  * Custom on blur function.
  */
	onBlur() {
		if (this.props.onBlur) this.props.onBlur();
	}

  /*
  * Change the state of the month.
  *
  * @param [String] name. Name passed from the month picker.
  * @param [any] value. Value of the month.
  */
  onMonthChange(name, value){
    this.setState({month: value})
    this.props.onChange(this.props.name, `${this.state.year}-${value}`);
  }

  /*
  * Change the state of the year.
  *
  * @param [String] name. Name passed from the year picker.
  * @param [any] value. Value of the year.
  */
  onYearChange(name, value){
    this.setState({year: value})
    this.props.onChange(this.props.name, `${value}-${this.state.month}`);
  }

	render(){
    const picker = this.props
    return (
      <View style={styles.pickerContainer}>
        <View style={styles.container}>
    			<MonthPicker
            style={picker.style}
            name="month"
            onChange={this.onMonthChange.bind(this)}
            value={this.state.month}
          />
        </View>
        <View style={styles.container}>
          <YearPicker
            style={picker.style}
            name="year"
            maxYear={picker.maxYear}
            minYear={picker.minYear}
            onChange={this.onYearChange.bind(this)}
            value={this.state.year}
          />
        </View>
      </View>
		);
	}
}

MonthYearPicker.propTypes = {
  maxYear: PropTypes.number,
  minYear: PropTypes.number,
	name: PropTypes.string,
	onChange: PropTypes.func,
  style:PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
	value: PropTypes.string
};

export default MonthYearPicker;

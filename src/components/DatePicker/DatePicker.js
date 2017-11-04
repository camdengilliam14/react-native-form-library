import React from 'react'
import PropTypes from 'prop-types'
import {Picker, StyleSheet, View} from 'react-native'
import DayPicker from './DayPicker'
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


class DatePicker extends React.Component {
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

    console.log(date.getDate())

		let year = date.getFullYear();
		let month = date.getMonth() + 1;
    let day = date.getDate();

		if (defaultValue){
			year = defaultValue ? parseInt(defaultValue[0]) : year,
			month = defaultValue && defaultValue[1] ? parseInt(defaultValue[1]) : month,
      day = defaultValue  && defaultValue[2] ? parseInt(defaultValue[2]) : day
		}

    this.props.onChange(this.props.name, `${year}-${month}-${day}`);

		return { year, month, day };
  }
	/*
  * Custom on blur function.
  */
	onBlur() {
		if (this.props.onBlur) this.props.onBlur();
	}

  /*
  * Change the state of the day.
  *
  * @param [String] name. Name passed from the day picker.
  * @param [any] value. Value of the day.
  */
  onDayChange(name, value){
    this.setState({day: value})
    this.props.onChange(this.props.name, `${this.state.year}-${this.state.month}-${value}`);
  }

  /*
  * Change the state of the month.
  *
  * @param [String] name. Name passed from the month picker.
  * @param [any] value. Value of the month.
  */
  onMonthChange(name, value){
    this.setState({month: value})
    this.props.onChange(this.props.name, `${this.state.year}-${value}-${this.state.day}`);
  }

  /*
  * Change the state of the year.
  *
  * @param [String] name. Name passed from the year picker.
  * @param [any] value. Value of the year.
  */
  onYearChange(name, value){
    this.setState({year: value})
    this.props.onChange(this.props.name, `${value}-${this.state.month}-${this.state.day}`);
  }

  /*
  * Get the days of a month for a given year.
  *
  * @param [int] month. Month, where jan starts at 1.
  * @param [int] year. Year to get days for month.
  */
	getDaysInMonth(month, year){
		//Day 0 is the last day in the previous month
		return new Date(year, month, 0).getDate();
	}

	render(){
    const picker = this.props
    const maxDays = this.getDaysInMonth(this.state.month, this.state.year)
    // If month changes and days in month are less than current value of day, reset day
    if (this.state.day > maxDays) {
      this.onDayChange('day', 1)
    }

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
          <DayPicker
            style={picker.style}
            maxDays={maxDays}
            name="day"
            onChange={this.onDayChange.bind(this)}
            value={this.state.day}
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

DatePicker.propTypes = {
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

export default DatePicker;

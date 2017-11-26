import React from 'react'
import PropTypes from 'prop-types'
import {Picker, StyleSheet, View} from 'react-native'

const styles = StyleSheet.create({
  pickerContainer: {
    flexDirection: 'row'
  },
  container: {
    flex: 1
  }
});


class TimePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.initializeState();
  }

  /*
  * Default the state of the date picker.
  */
	initializeState(){
		let date = new Date();
		let defaultValue = this.props.value ? this.props.value.split(":") : null;

    const hours = defaultValue ? this.convertTo12HourClock(parseInt(defaultValue[0])) : this.convertTo12HourClock(date.getHours())
    const minutes = defaultValue ? parseInt(defaultValue[1]) : date.getMinutes()
    const meridiem = defaultValue ? this.getMeridiem(parseInt(defaultValue[0])) : this.getMeridiem(date.getHours())

    this.props.onChange(this.props.name, this.convertTo24HourClock(hours, minutes, meridiem));

		return {
			hours,
			minutes,
			meridiem
		};
	}

	/*
  * Custom on blur function.
  */
	onBlur() {
		if (this.props.onBlur) this.props.onBlur();
	}

  /*
  * Render the hour picker.
  */
  renderHourPicker(){
    let hours = [];

    for (let i=0; i<12; i++){
      hours.push(<Picker.Item key={`hour${i}`} label={`${i+1}`} value={i+1} />);
    }

    return (
      <Picker
        style={this.props.style}
        selectedValue={this.state.hours}
        onValueChange ={(value) => this.onHourChange(value) }
      >
        {hours}
      </Picker>
    );
  }

  /*
  * Render the minute picker
  */
	renderMinutePicker(){
		let minutes = [];

		for (let i=0; i<60; i++){
			const minute = i < 10 ? `0${i}` : i;
			minutes.push(<Picker.Item key={`minute${i}`} label={`${minute}`} value={minute} />);
		}

		return (
			<Picker
        style={this.props.style}
        selectedValue={this.state.minutes}
        onValueChange = {(value)=> this.onMinuteChange(value)}>
				{minutes}
			</Picker>
		);
	}

  renderMeridiemPicker() {
    return (
      <Picker
        style={this.props.style}
        selectedValue={this.state.meridiem}
        onValueChange={(value) => this.onMeridiemChange(value)}
      >
        <Picker.Item label={"am"} value={"am"} />
        <Picker.Item label={"pm"} value={"pm"} />
      </Picker>
    )
  }

  /*
  * Change the value of form component.
  *
  * @param [any] value. Set the value of the form component.
  */
	onHourChange(value) {
    const {minutes, meridiem} = this.state
		this.setState({hours: value})
		this.props.onChange(this.props.name, this.convertTo24HourClock(value, minutes, meridiem));
	}

  /*
  * Change the value of form component.
  *
  * @param [any] value. Set the value of the form component.
  */
	onMinuteChange(value) {
    const {hours, meridiem} = this.state
		this.setState({minutes: value})
		this.props.onChange(this.props.name, this.convertTo24HourClock(hours, value, meridiem));
	}

  /*
  * Change the value of form component.
  *
  * @param [any] value. Set the value of the form component.
  */
	onMeridiemChange(value) {
    const {hours, minutes} = this.state
		this.setState({meridiem: value})
		this.props.onChange(this.props.name, this.convertTo24HourClock(hours, minutes, value));
	}

  /*
  * Utility function for converting hour from 24 hours to 12 hours
  *
  * @param [int] hour. Hour between 1 and 23.
  * @return [int]. Hour between 1 and 12.
  */
  convertTo12HourClock(hour){
  	return hour % 12 == 0 ? 12 : hour % 12;
  }

  /*
  * Utility function for getting time of day.
  *
  * @param [int] hour. Hour between 1 and 23.
  * @return [string]. am or pm.
  */
  getMeridiem(hour){
  	return hour >= 12 ? "pm" : "am";
  }

  /*
  * Utility function for converting time from 12 hour clock to 24 hour clock
  *
  * @param [int] hour. Hour between 1 and 23.
  * @param [int] minutes. Minutes between 0-59.
  * @param [int] meridiem. AM or PM.
  * @return [String]. e.g. 2:03 pm => 14:03
  */
  convertTo24HourClock(hour, minutes, meridiem){
  	let h = hour;

  	if (meridiem.toLowerCase() == "am" && hour == 12){
  		h = 0;
  	} else if (meridiem.toLowerCase() == "pm" && hour != 12){
  		h += 12;
  	}

  	return `${this.addZero(h)}:${this.addZero(minutes)}`;
  }

  /*
  * Add a zero to the beginnig of an integer if its less than 10.
  *
  * @param [Number] i. Number to add zero to.
  * @return [String]. Formatted number.
  */
  addZero(i) {
  	i=parseInt(i);
  	if (i < 10) { i = "0" + i; }
  	return i;
  }

	render(){
    const picker = this.props
    // const maxDays = this.getDaysInMonth(this.state.month, this.state.year)
    // // If month changes and days in month are less than current value of day, reset day
    // if (this.state.day > maxDays) {
    //   this.onDayChange('day', 1)
    // }

    return (
      <View style={styles.pickerContainer}>
        <View style={styles.container}>
    			{this.renderHourPicker()}
        </View>
        <View style={styles.container}>
          {this.renderMinutePicker()}
        </View>
        <View style={styles.container}>
          {this.renderMeridiemPicker()}
        </View>
      </View>
		);
	}
}

TimePicker.propTypes = {
	name: PropTypes.string,
	onChange: PropTypes.func,
  style:PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
	value: PropTypes.string
};

export default TimePicker;

import React from "react";
import PropTypes from "prop-types";
import {Text, TextInput, View, StyleSheet} from "react-native";

const styles = StyleSheet.create({
	labelText: {
    color: '#000',
    fontSize: 10,
    fontWeight: '900',
    marginBottom: 2
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 14
  }
});

class Input extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
      isFocused: false
    }
	}

  onBlur(event) {
    if (this.props.onBlur) this.props.onBlur()
    this.setState({isFocused: false})
  }

	onChange(event) {
		this.props.onChange(this.props.name, event.nativeEvent.text);
	}

  onFocus(event) {
    if (this.props.onFocus)  this.props.onFocus()
    this.setState({isFocused: true});
  }

	render () {
    const containerStyles = []
		const labelStyles = [styles.labelText]
		const inputStyles = [styles.textInput]

		const {containerStyle, labelStyle, inputStyle,
				containerActiveStyle, labelActiveStyle, inputActiveStyle,
			 containerErrorStyle, labelErrorStyle, inputErrorStyle,
			 label
		 } = this.props

		if (containerStyle) containerStyles.push(containerStyle)
		if (labelStyle) labelStyles.push(labelStyles)
		if (inputStyle) inputStyles.push(inputStyle)

		if (this.state.isFocused) {
			if (containerActiveStyle) containerStyles.push(containerActiveStyle)
			if (labelActiveStyle) labelStyles.push(labelActiveStyle)
			if (inputActiveStyle) containerClasses.push(inputActiveStyle)
		}

		if (this.props.error ) {
			if (containerErrorStyle) containerStyles.push(containerErrorStyle)
			if (labelErrorStyle) labelStyles.push(labelErrorStyles)
			if (inputErrorStyle) inputStyles.push(inputErrorStyles)
		}

    const input = this.props
		return (
			<View style={containerStyles}>
        {label ? <Text style={labelStyles}>{label}</Text> : null}
				<TextInput
          autoCapitalize={input.autoCapitalize}
          autoCorrect={input.autoCorrect}
          autoFocus={input.autoFocus}
          blurOnSubmit={input.blurOnSubmit}
          caretHidden={input.caretHidden}
          defaultValue={input.defaultValue}
          editable={input.editable}
          keyboardType={input.keyboardType}
          maxHeight={input.maxHeight}
          maxLength={input.maxLength}
					multiline={input.multiline}
          numberOfLines={input.numberOfLines}
          onBlur={this.onBlur.bind(this)}
          onChange={this.onChange.bind(this)}
          onContentSizeChange={input.onContentSizeChange}
          onEndEditing={input.onEndEditing}
          onFocus={this.onFocus.bind(this)}
          onScroll={input.onScroll}
          onSelectionChange={input.onSelectionChange}
          onSubmitEditing={input.onSubmitEditing}
          placeholder={input.placeholder}
					placeholderTextColor={input.placeholderTextColor}
          returnKeyType={input.returnKeyType}
					secureTextEntry={input.secureTextEntry}
          selectTextOnFocus={input.selectTextOnFocus}
          selection={input.selection}
          selectionColor={input.selectionColor}
    			style={inputStyles}
					value={input.value}
				/>
			</View>
		)
	}
}

Input.propTypes = {
  autoCapitalize: PropTypes.string,
  autoCorrect: PropTypes.bool,
  autoFocus: PropTypes.bool,
  blurOnSubmit: PropTypes.func,
  caretHidden: PropTypes.bool,
  containerStyle:PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
	containerActiveStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
	containerErrorStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
  defaultValue: PropTypes.string,
  editable: PropTypes.bool,
  error: PropTypes.string,
  inputActiveStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
	inputActiveStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
	inputErrorStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
  keyboardType: PropTypes.string,
  label: PropTypes.string,
  labelStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
	labelActiveStyle: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
	labelErrorStyle:PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
    PropTypes.number
  ]),
  maxHeight: PropTypes.number,
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onContentSizeChange: PropTypes.func,
  onEndEditing: PropTypes.func,
  onFocus: PropTypes.func,
  onScroll: PropTypes.func,
  onSelectionChange: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  placeholder: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  returnKeyType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  selectTextOnFocus: PropTypes.bool,
  selection: PropTypes.object,
  selectionColor: PropTypes.string,
  value: PropTypes.string
}

export default Input

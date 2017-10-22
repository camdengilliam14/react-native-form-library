import React from "react";

/*
* Function to provide Component with form fields a form field update method.
*
* @param [Component] Component. Component with form fields.
* @param [String] formDataProp. Your form object name in your component.
* @return [Component] FormWrapper. Wrapper component to provide update property to form fields.
*/

export default function Form(Component, formDataProp) {
	return class FormWrapper extends React.Component {
		/*
    * Method for updating the value of a form field.
    *
    * @param [String] key. Key of the form field of the form object to by updated.
    * Allow dot notation for field
    * @param [Any] value. New value of the form field.
    */
		onUpdateProperty(key, value) {
			let form = {...this.component.state[formDataProp]};
			form = this.traverseNested(form, key)
			const cmd = `form.${key}=value`
			const setter = new Function('form', 'key', 'value', cmd)
			setter(form, key, value, cmd)
			let newState = {};
			newState[formDataProp] = form;
			this.component.setState(newState)
		}

		/*
		* Traverse the obj tree annd ensure nested objects exists
		*
		* @param [Object] obj. Object to set key
		* @ param [String] key. Key of the object. Can be nested.
		*/
		traverseNested (obj, key) {
			const keys = key.split('.')
			if (!obj[keys[0]] && keys.length > 1) obj[keys[0]] = {}
			if (keys.length <= 2) {
				return obj
			} else {
				const nextKey = keys[0]
				keys.shift()
				let newObj = obj
				newObj[nextKey] = this.traverseNested(obj[nextKey], keys.join('.'))
				return newObj
			}
		}

		render () {
			return (
				<Component
					ref={(component) => { this.component = component; }}
					{...this.props}
          updateProperty={this.onUpdateProperty.bind(this)}
				/>
			);
		}
	};
}

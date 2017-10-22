import React from 'react'

/*
* Function to provide Component with form validation
*
* @param [Component] Component. Component with form fields.
* @return [Component] FormWrapper. Wrapper component to provide form validation to form fields.
*/
export default function ValidateForm (Component) {
  return class ValidateForm extends React.Component {
    constructor (props) {
      super(props)
      this.state = {formErrors: {}}
    }

    /*
    * Method to reinitialize form validation
    */
    resetValidation () {
      this.setState({formErrors: {}})
    }

    /*
    * Loop over form data and validate each value.
    * @param [Object] form. The form object.
    * @param [Object] requiredFields. The required fields to be validated.
    */
    validateForm (form, requiredFields) {
      let errors = {}
      Object.keys(requiredFields).forEach((key, index) => {
        const type = requiredFields[key].type
        const value = key.split('.').reduce((o, i) => o[i], form) // allow dot notation
        let message = ''
        let valid = true

        if (requiredFields[key].validate) {
          valid = requiredFields[key].validate(value)
          message = requiredFields[key].message || 'Required *'
        } else {

          // switch input type
          switch (type) {
            case 'required': {
              valid = this.validateRequired(value)
              message = requiredFields[key].message || 'Required *'
              break
            }
            case 'email': {
              valid = this.validateEmail(value)
              message = requiredFields[key].message || 'Invalid email format.'
              break
            }
            case 'password': {
              valid = this.validatePassword(value)
              message = requiredFields[key].message ||  'Password must be atleast 8 characters.'
              break
            }
            case 'passwordConfirmation': {
              const n = key.lastIndexOf('.')
              const passwordKey = n > 0 ? `${key.substring(0, n)}.password` : 'password'
              const password = passwordKey.split('.').reduce((o, i) => o[i], form)
              valid = this.validatePasswordConfirmation(password, value)
              message = requiredFields[key].message ||  'Password and password confirmation must match.'
              break
            }
            case 'phone': {
              valid = this.validatePhone(value)
              message = requiredFields[key].message || 'Number must be a valid 10 digit phone number.'
              break
            }
            case 'array': {
              valid = this.validateArray(value)
              message = requiredFields[key].message ||  'Required *'
              break
            }
            default:
              break
          }
        }

        // allow dot notation
        if (!valid) {
          errors = this.traverseNested(errors, key)
          const cmd = `errors.${key}=message`
          const setter = new Function('errors', 'key', 'message', cmd)
          setter(errors, key, message, cmd)
        }
      })

      if (Object.keys(errors).length > 0) {
        this.setState({formErrors: errors})
        return false
      }
      return true
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

    /*
    * Validate the phone number is a proper 10 digit phone number.
    *
    * @param [Any] value. Value to be validated.
    * @param [Boolean]. Boolean value indicated whether the form input is valid.
    */
    validateRequired (value) {
      return !!(value && value != null)
    }

    /*
    * Validate the phone number is a proper 10 digit phone number.
    *
    * @param [String] value. Value to be validated.
    * @param [Boolean]. Boolean value indicated whether the form input is valid.
    */
    validateEmail (value) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return value && re.test(value)
    }

    /*
    * Validate the phone number is a proper 10 digit phone number.
    *
    * @param [String] value. Value to be validated.
    * @param [Boolean]. Boolean value indicated whether the form input is valid.
    */
    validatePassword (value) {
      return value && value.length >= 8
    }

    /*
    * Validate the password confirmation matches password.
    *
    * @param [String] password. Value to be validated.
    * @param [Boolean]. passwordConfirmation. Value to be validated.
    */
    validatePasswordConfirmation (password, passwordConfirmation) {
      return password === passwordConfirmation
    }

    /*
    * Validate the phone number is a proper 10 digit phone number.
    *
    * @param [String] value. Value to be validated.
    * @param [Boolean]. Boolean value indicated whether the form input is valid.
    */
    validatePhone (value) {
      var re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
      return value && re.test(value)
    }

    /*
    * Validate the array value is greater than 0.
    *
    * @param [Array] value. Value to be validated.
    * @param [Boolean]. Boolean value indicated whether the form input is valid.
    */
    validateArray (value) {
      if (value && value.length > 0) {
        if (typeof value[0] === 'object' && !Array.isArray(value[0]) && value[0] !== null) {
          return Object.keys(value[0]).length > 0
        } else {
          return value && value.length > 0
        }
      } else return false
    }

    render () {
      return (
        <Component
          {...this.props}
          formErrors={this.state.formErrors}
          validateForm={this.validateForm.bind(this)}
          resetValidation={this.resetValidation.bind(this)}
        />
      )
    }
  }
}

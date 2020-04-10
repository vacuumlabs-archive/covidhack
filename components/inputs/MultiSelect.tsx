import {Field} from 'formik'
import React from 'react'
import Select from 'react-select'
import {availableCountries} from '../../utils/constants'

const checkbox = ({isSelected}) => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: isSelected ? '#DA716C' : '#f9f5f2',
    content: '" "',
    marginRight: '16px',
    backgroundImage: isSelected && 'url("/images/checkmark.svg")',
    backgroundRepeat: 'no-repeat',
    backgroundPositionX: '2px',
    backgroundPositionY: '2.5px',
    height: '16px',
    width: '16px',
    boxShadow: 'inset 0px 1px 4px rgba(0, 0, 0, 0.08)',
  },
})

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: '#FDFCFC',
    boxShadow: 'inset 0px 1px 4px rgba(0, 0, 0, 0.06)',
    borderRadius: '4px',
    border: 0,
    cursor: 'pointer',
    minHeight: '47px',
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '12px',
    lineHeight: '20px',
    fontStyle: 'italic',
    color: '#91908d',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: '8px 12px',
  }),
  multiValue: (provided) => ({
    ...provided,
    borderRadius: '0',
    background: '#F9F5F2',
    padding: '4px 12px 4px 12px',
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    padding: 0,
    paddingLeft: 0,
    fontSize: '14px',
    lineHeight: '19px',
    color: '#000',
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    padding: 0,
    color: '#12100E',
    marginLeft: '9px',
    ':hover': {
      backgroundColor: 'transparent',
      color: '#000',
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#D2CBC6',
    padding: '12px',
    ':hover': {
      color: '#D2CBC6',
    },
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: '#D2CBC6',
    padding: '12px',
    ':hover': {
      color: '#D2CBC6',
    },
  }),
  indicatorSeparator: (provided) => ({
    ...provided,
    backgroundColor: '#D2CBC6',
    marginBottom: '10px',
    marginTop: '10px',
  }),
  menu: (provided) => ({
    ...provided,
    background: '#fff',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.08)',
    margin: 0,
    overflowY: 'auto',
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '236px',
    padding: '5px 0px',
    '::-webkit-scrollbar-track': {
      width: '3px',
      marginTop: '8px',
      marginBottom: '8px',
      backgroundColor: 'transparent',
    },
    '::-webkit-scrollbar': {
      width: '3px',
      marginTop: '8px',
      marginBottom: '8px',
      backgroundColor: 'transparent',
    },
    '::-webkit-scrollbar-thumb': {
      width: '3px',
      height: '32px',
      borderRadius: '60px',
      backgroundColor: '#d2cbc6',
    },
  }),
  option: (styles, {isFocused, isSelected}) => {
    return {
      ...styles,
      ...checkbox({isSelected}),
      fontSize: '12px',
      lineHeight: '16px',
      color: '#000',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: isSelected ? '#fff' : isFocused ? '#fff' : '#fff',

      ':active': {
        backgroundColor: '#fff',
      },
    }
  },
}

const options = availableCountries.map((option) => {
  return {value: option, label: option}
})

const valuesToOptions = (values) => {
  if (!values) return []
  return options.filter((item) => values.includes(item.value))
}
const optionsToValues = (options) => {
  return options.map((option) => option.value)
}

const MultiSelect = (props) => {
  return (
    <Field name={props.name}>
      {({form, field}) => (
        <Select
          isMulti
          closeMenuOnSelect={false}
          options={options}
          styles={customStyles}
          placeholder="Hľadať"
          hideSelectedOptions={false}
          onChange={(value) => form.setFieldValue(props.name, optionsToValues(value))}
          value={valuesToOptions(field.value)}
        />
      )}
    </Field>
  )
}

export default MultiSelect

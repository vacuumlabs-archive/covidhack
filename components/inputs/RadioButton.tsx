import {Field} from 'formik'
import React from 'react'

const RadioButton = (props) => {
  return (
    <>
      <Field name={props.name}>
        {({form, field}) => (
          <label className="label">
            <input
              type="radio"
              {...props}
              checked={field.value == props.value}
              onChange={() => {
                form.setFieldValue(props.name, props.value)
              }}
            />
            {props.label}
            <span className="radio"></span>
          </label>
        )}
      </Field>
      <style jsx>{`
        .label {
          display: inline-flex;
          align-items: center;
          position: relative;
          margin-bottom: 0;
          cursor: pointer;
          font-weight: 800;
          font-size: 16px;
          line-height: 28px;
          padding-left: 32px;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .label input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        .radio {
          position: absolute;
          top: 5px;
          left: 0;
          height: 16px;
          width: 16px;
          background-color: #eee;
          border-radius: 50%;
        }
        }
        .radio:after {
          content: '';
          position: absolute;
          display: none;
        }
        .label input:checked ~ .radio:after {
          display: block;
        }
        .label .radio:after {
          top: 4px;
          left: 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #e56a61;
        }
      `}</style>
    </>
  )
}

export default RadioButton

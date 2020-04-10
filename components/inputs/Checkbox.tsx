import {Field} from 'formik'
import React from 'react'

const Checkbox = (props) => {
  return (
    <>
      <Field name={props.name}>
        {({field, form}) => (
          <label className="label">
            {props.label}
            <input
              type="checkbox"
              {...props}
              checked={field.value.includes(props.value)}
              onChange={() => {
                if (field.value.includes(props.value)) {
                  const nextValue = field.value.filter((value) => value !== props.value)
                  form.setFieldValue(props.name, nextValue)
                } else {
                  const nextValue = field.value.concat(props.value)
                  form.setFieldValue(props.name, nextValue)
                }
              }}
            />
            <span className="checkmark"></span>
          </label>
        )}
      </Field>
      <style jsx>{`
        .label {
          display: flex;
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
        .checkmark {
          position: absolute;
          top: 5px;
          left: 0;
          height: 16px;
          width: 16px;
          background: #fbf4ef;
          box-shadow: inset 0px 1px 4px rgba(0, 0, 0, 0.08);
        }
        .label input:checked ~ .checkmark {
          background: #e56a61;
        }
        .checkmark:after {
          content: '';
          position: absolute;
          display: none;
        }
        .label input:checked ~ .checkmark:after {
          display: block;
        }
        .label .checkmark:after {
          left: 5.5px;
          top: 2.5px;
          width: 3px;
          height: 7px;
          border: solid #fff;
          border-width: 0 2px 2px 0;
          -webkit-transform: rotate(36deg);
          -ms-transform: rotate(36deg);
          transform: rotate(36deg);
        }
      `}</style>
    </>
  )
}

export default Checkbox

import React, { useMemo, forwardRef } from 'react'
import ReactSelect from 'react-select'

type SelectProps = {
  placeholder: string
  options: string[]
  onChange: (label: string) => void
}

const Select = forwardRef(
  (props: SelectProps, ref: React.MutableRefObject<any>) => {
    const options = useMemo(
      () => props.options.map((e, i) => ({ value: i, label: e })),
      [props.options]
    )

    const handleChange = (value: { value: number; label: string }) => {
      if (value) {
        props.onChange(value.label)
      }
    }

    return (
      <ReactSelect
        className="w-64 h-8 mx-1 my-2 rounded-md border border-gray-200"
        instanceId={props.placeholder}
        placeholder={props.placeholder}
        options={options}
        onChange={handleChange}
        ref={ref}
      />
    )
  }
)

export default Select

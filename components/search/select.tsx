import React, { useMemo, forwardRef } from 'react'
import ReactSelect from 'react-select'

type SelectProps = {
  placeholder: string
  options: string[]
  onChange: (index: number) => void
}

const Select = forwardRef(
  (props: SelectProps, ref: React.MutableRefObject<any>) => {
    const options = useMemo(
      () => props.options.map((e, i) => ({ value: i, label: e })),
      [props.options]
    )

    const handleChange = (value: { value: number; label: string }) => {
      if (value) {
        console.log(value)
        props.onChange(value.value)
      }
    }

    return (
      <ReactSelect
        className="w-48 h-8 m-1 rounded-md border border-gray-200"
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

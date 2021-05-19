import React, { useMemo, forwardRef } from 'react'
import ReactSelect from 'react-select'

type Props = {
  placeholder: string
  options: string[]
  onChange: (label: string) => void
}

const Select = forwardRef((props: Props, ref: React.MutableRefObject<any>) => {
  const options = useMemo(
    () => props.options.map((e, i) => ({ value: i, label: e })),
    [props.options]
  )

  const handleChangeSelect = (value: { value: number; label: string }) => {
    if (value) {
      props.onChange(value.label)
    }
  }

  return (
    <ReactSelect
      className="w-72 h-8 mx-1 my-2 rounded-md bg-white"
      instanceId={props.placeholder}
      placeholder={<p>{props.placeholder}</p>}
      options={options}
      formatOptionLabel={(option) => (
        <div>
          <p>{option.label}</p>
        </div>
      )}
      onChange={handleChangeSelect}
      ref={ref}
    />
  )
})

export default Select

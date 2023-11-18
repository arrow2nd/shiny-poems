import React, {
  HTMLProps,
  MutableRefObject,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState
} from "react";

const placeholderValue = "empty";

export type SelectElement = {
  clear(): void;
} & HTMLSelectElement;

const Select = (
  props: HTMLProps<HTMLSelectElement>,
  ref: MutableRefObject<SelectElement>
) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const selectRef = useRef<HTMLSelectElement>(null);

  useImperativeHandle(ref, () => ({
    ...selectRef.current!,
    clear() {
      setShowPlaceholder(true);

      if (selectRef.current) {
        selectRef.current.selectedIndex = 0;
        selectRef.current.value = placeholderValue;
      }
    }
  }));

  return (
    <select
      className={`p-2 w-full lg:w-72 m-2 bg-white border-main border-2 rounded-md appearance-none bg-arrow-down bg-right-center bg-no-repeat ${
        showPlaceholder ? "text-sub" : "text-main"
      }`}
      {...props}
      ref={selectRef}
      value={showPlaceholder ? placeholderValue : undefined}
      onChange={(event) => {
        if (showPlaceholder && event.currentTarget.value !== placeholderValue) {
          setShowPlaceholder(false);
        }

        if (props.onChange) {
          props.onChange(event);
        }
      }}
    >
      {props.placeholder && (
        <option value={placeholderValue} disabled style={{ display: "none" }}>
          {props.placeholder}
        </option>
      )}
      {props.children}
    </select>
  );
};

export default forwardRef(Select);

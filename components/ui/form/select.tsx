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
      className={`m-2 w-full appearance-none rounded-md border-2 border-main bg-white bg-arrow-down bg-right-center bg-no-repeat p-2 focus:border-black lg:w-72 ${
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

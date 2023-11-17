"use client";

import { useFormState } from "react-dom";

import Poems from "components/poems";

import { searchPoems } from "libs/search";

import { Poem } from "types/poem";
import { SelectOptions } from "types/select-options";

import Form from "./form";
import Line from "./line";

type Props = {
  selectOptions: SelectOptions;
  poems: Poem[];
};

const UI = ({ selectOptions, poems }: Props): JSX.Element => {
  const [state, dispatch] = useFormState(searchPoems, { poems });

  return (
    <div className="flex-grow mx-6 md:mx-12">
      <Form selectOptions={selectOptions} dispatch={dispatch} />
      <Line />
      <Poems items={state.poems} />
    </div>
  );
};

export default UI;

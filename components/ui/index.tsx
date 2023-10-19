import React from "react";

import Poems from "components/poems";

import { SearchParams } from "libs/poems";

import { Poem } from "types/poem";

import Form from "./form";
import Line from "./line";

type Props = {
  poems: Poem[];
  searchParams?: SearchParams;
};

const UI = ({ poems, searchParams }: Props): JSX.Element => {
  return (
    <div className="flex-grow mx-6 md:mx-12">
      <Form params={searchParams} />
      <Line />
      <Poems items={poems} />
    </div>
  );
};

export default UI;

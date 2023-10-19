"use client";

import { useEffect, useState } from "react";

import Poems from "components/poems";

import { Poem } from "types/poem";

import Form from "./form";
import Line from "./line";

type Props = {
  poems: Poem[];
};

const UI = ({ poems }: Props): JSX.Element => {
  return (
    <div className="flex-grow mx-6 md:mx-12">
      <Form />
      <Line />
      <Poems items={poems} />
    </div>
  );
};

export default UI;

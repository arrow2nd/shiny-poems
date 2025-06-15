import { type JSX } from "react";
import { GroupBase } from "react-select";
import Poems from "components/poems";
import { clothes } from "data/clothes";
import { units } from "data/units";
import { Poem } from "types/poem";
import Form, { FormProps } from "./form";
import { Option } from "./form/select";
import Line from "./line";

type Props = {
  poems: Poem[];
} & Pick<FormProps, "query">;

const UI = ({ poems, query }: Props): JSX.Element => {
  const idolOptions: GroupBase<Option>[] = units.map(({ name, members }) => ({
    label: name,
    options: members.map((m) => ({ label: m, value: m }))
  }));

  const clotheOptions: Option[] = [
    ...Array.from(new Set(clothes)).map((e) => ({
      value: e as string,
      label: e as string
    }))
  ];

  return (
    <div className="mx-6 grow md:mx-12">
      <Form
        query={query}
        idolOptions={idolOptions}
        clotheOptions={clotheOptions}
      />
      <Line />
      <Poems items={poems} />
    </div>
  );
};

export default UI;

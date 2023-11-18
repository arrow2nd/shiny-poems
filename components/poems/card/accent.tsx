type Props = {
  bgColor: string;
};

const Accent = ({ bgColor }: Props): JSX.Element => {
  const style: React.CSSProperties = {
    backgroundColor: `#${bgColor}`
  };

  return (
    <div
      className="mb-4 w-10 rounded-full border border-gray-100 py-0.5"
      style={style}
      data-testid="poem-card-accent"
    />
  );
};

export default Accent;

type Props = {
  bgColor: string;
};

const Accent = ({ bgColor }: Props): JSX.Element => {
  const style: React.CSSProperties = {
    backgroundColor: `#${bgColor}`
  };

  return (
    <div
      className="mb-4 py-0.5 w-10 rounded-full border border-gray-100"
      style={style}
      data-testid="poem-card-accent"
    />
  );
};

export default Accent;

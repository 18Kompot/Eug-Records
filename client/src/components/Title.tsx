interface Props {
  main: JSX.Element;
  sub: JSX.Element;
}

export default function Title({ main, sub }: Props) {
  return (
    <div className="m-5">
      <h2 className="text-white text-center">{main}</h2>
      <br />
      <h3 className="text-center text-white fw-normal mb-4">{sub}</h3>
    </div>
  );
}

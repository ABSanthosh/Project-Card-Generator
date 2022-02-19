import "./FancyInput.scss";

export interface IFancyInputProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  name?: string;
  id?: string;
}

export function FancyInput(props: IFancyInputProps) {
  return (
    <input
      id={props.id}
      name={props.name}
      className="FancyInput"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
    />
  );
}

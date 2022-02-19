import "./FancyTextarea.scss";

export interface IFancyTextareaProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  name?: string;
  id?: string;
  style?: React.CSSProperties;
}

export function FancyTextarea(props: IFancyTextareaProps) {
  return (
    <textarea
      id={props.id}
      name={props.name}
      style={props.style}
      className="FancyTextarea"
      placeholder={props.placeholder}
      value={props.value}
      onChange={(e) => props.setValue(e.target.value)}
    />
  );
}

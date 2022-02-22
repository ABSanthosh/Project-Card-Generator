import "./FancyTextarea.scss";

export interface IFancyTextareaProps {
  value: string;
  setValue: (value: string) => void;
  placeholder: string;
  name?: string;
  id?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
}

export function FancyTextarea(props: IFancyTextareaProps) {
  return (
    <textarea
      id={props.id}
      name={props.name}
      value={props.value}
      style={props.style}
      disabled={props.disabled}
      className="FancyTextarea"
      placeholder={props.placeholder}
      onChange={(e) => props.setValue(e.target.value)}
    />
  );
}

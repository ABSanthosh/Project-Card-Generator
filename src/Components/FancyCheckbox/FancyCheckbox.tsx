import "./FancyCheckbox.scss";

export interface IFancyCheckboxProps {
  name: string;
  id: string;
  value: boolean;
  setValue: (val: boolean) => void;
  defaultValue?: boolean;
  style?: React.CSSProperties;
}

export function FancyCheckbox(props: IFancyCheckboxProps) {
  return (
    <input
    id={props.id}
      type="checkbox"
      name={props.name}
      style={props.style}
      checked={props.value}
      className="FancyCheckbox"
      defaultChecked={props.defaultValue}
      onChange={(e) => props.setValue(e.target.checked)}
    />
  );
}

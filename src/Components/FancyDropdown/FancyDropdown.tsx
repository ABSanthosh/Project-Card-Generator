import "./FancyDropdown.scss";

export interface IFancyDropdownProps {
  options: string[];
  id: string;
  name: string;
  defaultValue?: string;
  setValue: (value: string) => void;
}

export function FancyDropdown(props: IFancyDropdownProps) {
  return (
    <select
      id={props.id}
      name={props.name}
      className="FancyDropdown"
      defaultValue={props.defaultValue}
      onChange={(e) => props.setValue(e.target.value)}
    >
      {props.options.map((option, index) => {
        return (
          <option value={option} key={index}>
            {option}
          </option>
        );
      })}
    </select>
  );
}

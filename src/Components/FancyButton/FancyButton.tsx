import "./FancyButton.scss";

export interface IFancyButtonProps {
  value: string;
  disabled?: boolean;
  onClick: () => void;
}

export function FancyButton(props: IFancyButtonProps) {
  return (
    <button
      disabled={props.disabled}
      className="FancyButton"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

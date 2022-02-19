import * as React from "react";
import "./InputContainer.scss";

export interface IInputContainerProps {
  children: React.ReactNode;
  htmlFor?: string;
  label?: string;
  isRequired?: boolean;
  isColumn?: boolean;
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  alignItems?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around";
  gap?: string;
}

export function InputContainer(props: IInputContainerProps) {
  return (
    <div
      className="InputContainer"
      style={{
        flexDirection: props.isColumn ? "column" : "row",
        justifyContent: props.justifyContent,
        alignItems: props.alignItems,
        gap: props.gap,
      }}
    >
      <label htmlFor={props.htmlFor}>
        {props.label}
        {props.isRequired && (
          <span className="InputContainer--req">&nbsp;*</span>
        )}
      </label>
      {props.children}
    </div>
  );
}

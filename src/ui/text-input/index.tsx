import React, { AllHTMLAttributes, ReactElement } from "react"

type TextInputProps= Omit<AllHTMLAttributes<HTMLInputElement>, "onChange"> & {
  icon?: ReactElement;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextInput = ({ icon, onChange, ...rest }: TextInputProps) => (
  <div className="text-input">
    <div className="text-input__icon">{icon}</div>
    <input {...rest} onChange={onChange} className="text-input__input" type="text" />
  </div>
)
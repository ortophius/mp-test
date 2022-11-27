import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, useState } from "react";
import OutsideClickHandler from 'react-outside-click-handler';

type SelectItem<T> = {
  label: string;
  value: T;
}

type SelectProps<T> = {
  icon?: ReactElement;
  items: SelectItem<T>[];
  currentIndex: number;
  onChange: (value: T) => void;
}

export const Select = <T = any>({
  items,
  onChange,
  currentIndex,
  icon
}: SelectProps<T>) => {
  const [open, setOpen] = useState(false);

  const handleChangeCurrentItem = (value: T) => {
    onChange(value);
    setOpen(false);
  }

  return(
    <div className="select">
      <OutsideClickHandler onOutsideClick={() => { setOpen(false) }}>
        <button className="select__toggle" onClick={() => { setOpen(!open) }}>
          <div className="select__icon">{icon}</div>
          <span className="select__label">{ items[currentIndex].label }</span>
          <div className="select__chevron">
            <FontAwesomeIcon icon="caret-down" />
          </div>
        </button>
        { open && (
          
              <ul className="select__options">
              { items.map(({ label, value }, index) => (
                <li key={`${label}-${value}`} className="select__option">
                  <button className="select__optionBtn" onClick={() => { handleChangeCurrentItem(value) }}>
                    {label}
                  </button>
                </li>
              )) }
            </ul>
        )}
      </OutsideClickHandler>
    </div>
  )
}
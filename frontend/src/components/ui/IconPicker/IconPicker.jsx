import { useState } from "react";
import { IconsData } from "../../../app/icons/IconsData";
import classes from "./IconPicker.module.css";

export const IconPicker = ({ value, onChange }) => {

const [open, setOpen] = useState(false);

    return (
        <div className={classes.iconPickerContainer}>
            <label className={classes.iconPickerLabel}>Icon</label>
            <button className={classes.iconPickerBtn} onClick={() => setOpen(!open)}>
                {value ? IconsData[value]({ width: 24, height: 24 }) : IconsData["QuestionMarkIcon"]({ width: 24, height: 24 })}
            </button>

    
            {open && (
                <div className={classes.iconPickerDataContainer}>
                    {Object.keys(IconsData).map((key) => {
                        const Icon = IconsData[key];
                        return (
                            <div className={classes.iconPickerDataItem} key={key} 
                             style={{ border: value === key ? "2px solid black" : "1px solid #eee" }}
                              onClick={() => {onChange(key); setOpen(false);}}
                            >
                                <Icon width={24} height={24} />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

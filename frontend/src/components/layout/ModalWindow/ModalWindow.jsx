import { CloseIcon } from "../../../app/icons/Icons";
import classes from "./ModalWindow.module.css";

export const ModalWindow = ({children, onClose, title}) => {
    return (
        <div className={classes.modalWindowOverlay} onClick={onClose}>
            <div className={classes.modalWindowContainer} onClick={(e) => e.stopPropagation()}>
                <div className={classes.modalWindowtopBar}>
                    <span className={classes.modalWindowTitle}>{title}</span>
                    <button onClick={onClose}><CloseIcon className={classes.modalWindowBtnIcon} /></button>
                </div>
                {children}
            </div>
        </div>
    );
}
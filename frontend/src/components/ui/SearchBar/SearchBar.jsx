import { SearchIcon } from "../../../app/icons/Icons";
import { CustomInput } from "../../../features/customer/components/ui/CustomInput/CustomInput";
import classes from "./SearchBar.module.css";

export const SearchBar = ({style, onChange}) => {
    return (
        <div className={classes.searchbarContainer} >
            <SearchIcon className={classes.searchbarIcon} />
            <CustomInput placeholder="Search..." onChange={onChange} />
        </div>
    );
}
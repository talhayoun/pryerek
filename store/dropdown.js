import { createContext, useState } from "react";

export const DropdownContext = createContext();

export const DropdownContextProvider = (props) => {
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    return (
        <DropdownContext.Provider
            value={{ isDropdownVisible, setIsDropdownVisible }}
        >
            {props.children}
        </DropdownContext.Provider>
    );
};

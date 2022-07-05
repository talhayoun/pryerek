import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

export const NavItem = (props) => {
    const { num, title, changeNum } = props;

    return (
        <div
            onMouseEnter={() => changeNum ? changeNum(num) : null}
            style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                gap: "5px",
                position: "relative",
            }}
        >
            {props.children}
            <span>{title}</span>
            <KeyboardArrowDownIcon />
        </div>
    );
};

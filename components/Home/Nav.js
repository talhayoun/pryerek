import { NavItem } from "./NavItem";
import Apple from "../../public/images/nav/apple.svg";
import Broccoli from "../../public/images/nav/broccoli.svg";
import Cheese from "../../public/images/nav/cheese.svg";
import Discount from "../../public/images/nav/discount.svg";
import Mushrooms from "../../public/images/nav/mushrooms.svg";
import Nuts from "../../public/images/nav/nuts.svg";
import Wine from "../../public/images/nav/wine.svg";
import { NavDropdown } from "./NavDropdown";
import { useState } from "react";

export const Nav = () => {
    const [hoverNum, setHoverNum] = useState(null);
    const [visible, setVisible] = useState(false);


    return (
        <div className="nav">
            <NavItem title={"ירקות"} num={1} changeNum={setHoverNum}>
                <Broccoli style={{ width: "20px" }} />
            </NavItem>
            <NavItem title={"פירות"} num={2} changeNum={setHoverNum}>
                <Apple style={{ width: "20px" }} />
            </NavItem>
            <NavItem title={"מעדנייה"} num={3} changeNum={setHoverNum}>
                <Cheese style={{ width: "20px" }} />
            </NavItem>
            <NavItem title={"ירק ופטריות"} num={4} changeNum={setHoverNum}>
                <Mushrooms style={{ width: "20px" }} />
            </NavItem>
            <NavItem title={"מזווה"} num={5} changeNum={setHoverNum}>
                <Wine style={{ width: "20px" }} />
            </NavItem>
            <NavItem title={"יבשים"} num={6} changeNum={setHoverNum}>
                <Nuts style={{ width: "20px" }} />
            </NavItem>
            <NavItem title={"מבצעים"}>
                <Discount style={{ width: "30px" }} />
            </NavItem>
            <NavDropdown
                num={hoverNum}
                changeNum={setHoverNum}
                visible={visible}
                setVisible={setVisible}
            />
        </div>
    );
};

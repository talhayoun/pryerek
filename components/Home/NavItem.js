import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useRouter } from "next/dist/client/router";
import { useContext } from "react";
import { ProductsContext } from "../../context/productsContext";
import { replaceProductsAction } from "../../store/actions/productsActions";

export const NavItem = (props) => {
    const { num, title, changeNum } = props;

    const router = useRouter();
    const { productsState, dispatchProducts } = useContext(ProductsContext);
    const handleImageClick = async () => {
        const filteredProducts = productsState.allProducts[num];
        window.scroll({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
        dispatchProducts(replaceProductsAction(filteredProducts));
        router.push("/")
    };

    return (
        <div
            onClick={handleImageClick}
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
            <span >{title}</span>
            <KeyboardArrowDownIcon />
        </div>
    );
};

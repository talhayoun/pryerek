import { useRouter } from "next/dist/client/router";
import { useContext, useEffect, useState } from "react";
import { ProductsContext } from "../../context/productsContext";
import { changeDropdownVisibilityAction, replaceProductsAction } from "../../store/actions/productsActions";

const images = [
    "/images/nav/boxes/cheese.jpeg",
    "/images/nav/boxes/bread.png",
    "/images/nav/boxes/fruits.jpeg",
    "/images/nav/boxes/popc.jpeg",
    "/images/nav/boxes/vegetables.jpeg",
];

export const NavDropdown = (props) => {
    const { num, changeNum } = props;
    const [products, setProducts] = useState([]);
    const [imgSrc, setImgSrc] = useState("");


    const router = useRouter();
    const { productsState, dispatchProducts } = useContext(ProductsContext);
    const handleMouseLeave = () => {
        changeNum(null);
        dispatchProducts(changeDropdownVisibilityAction(false))
    };


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

    useEffect(() => {
        if (num) {
            const fetchProducts = async () => {
                const filteredProducts = productsState.allProducts[num];
                console.log(productsState, "!!")
                const slicedProducts = [];
                for (let i = 0; i < 6 && i < filteredProducts?.length; i++) {
                    slicedProducts.push(filteredProducts[i]);
                }

                setProducts(slicedProducts);
            };
            fetchProducts();
        }

        switch (num) {
            case 1:
                setImgSrc(images[4]);
                break;
            case 2:
                setImgSrc(images[2]);
                break;
            case 3:
                setImgSrc(images[0]);
                break;
            case 4:
                setImgSrc(images[4]);
                break;
            case 5:
                setImgSrc(images[1]);
                break;
            case 6:
                setImgSrc(images[3]);
                break;
            case 7:
                setImgSrc(images[3]);
                break;
            default:
                break;
        }
        if (num) dispatchProducts(changeDropdownVisibilityAction(true))
    }, [num]);
    return (
        <>
            {productsState?.dropdownVisible && (
                <div
                    className="dropdown-container"
                    onMouseLeave={handleMouseLeave}
                    style={{
                        position: "absolute",
                        top: "60px",
                        zIndex: "999",
                        background: "#FFF",
                        width: "80%",
                        right: 0,
                        display: "flex",
                        borderRadius: "20px",
                        boxShadow: "2px 2px 5px rgb(0 0 0 / 20%)",
                        opacity: 0.9,
                    }}
                >
                    <div style={{ padding: "5% 10%", borderLeft: "1px solid #363636" }}>
                        <div
                            onClick={handleImageClick}
                            className={"nav-img"}
                            style={{
                                height: "150px",
                                background: `url('${imgSrc}')`,
                                cursor: "pointer",
                                width: "150px",
                                boxShadow: "0px 0px 10px 0px rgb(0 0 0 / 50%)",
                                borderRadius: "10px 10px 10px 10px",
                                padding: "2px",
                            }}
                        />
                    </div>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                            gap: "15px",
                            width: "70%",
                        }}
                    >
                        <div
                            style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                                gap: "20px",
                            }}
                        >
                            {products?.map((currentProduct, index) => (
                                <div
                                    key={index}
                                    className="nav-dropdown-item"
                                    style={{
                                        cursor: "pointer",
                                        width: "350px",
                                        boxShadow: "0px 0px 10px 0px rgb(0 0 0 / 50%)",
                                        borderRadius: "10px 10px 10px 10px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "5px",
                                    }}
                                >
                                    <img
                                        style={{ height: "50px", width: "50px" }}
                                        src={`https://eropa.co.il/fruits/uploads/${currentProduct?.id}.jpg `}
                                    />
                                    <span>{currentProduct?.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

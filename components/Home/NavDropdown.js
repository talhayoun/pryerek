import { useContext, useEffect, useState } from "react";
import { fetchProductsByCategoryId } from "../../apis/products";
import { ProductsContext } from "../../context/productsContext";
import Cheese from "../../public/images/nav/boxes/cheese.jpeg";
import Farm from "../../public/images/nav/boxes/farm.png";
import Fruits from "../../public/images/nav/boxes/fruits.jpeg";
import Popc from "../../public/images/nav/boxes/Popc.jpeg";
import Vegetables from "../../public/images/nav/boxes/Vegetables.jpeg";
import { replaceProductsAction } from "../../store/actions/productsActions";

export const NavDropdown = (props) => {
    const { num, changeNum, visible, setVisible } = props;
    const [products, setProducts] = useState([]);
    const [imgSrc, setImgSrc] = useState("");

    const { productsState, dispatchProducts } = useContext(ProductsContext);
    const handleMouseLeave = () => {
        changeNum(null);
        setVisible(false);
    };

    const handleImageClick = async () => {
        const filteredProducts = productsState.allProducts[num]
        dispatchProducts(replaceProductsAction(filteredProducts));
    };

    useEffect(() => {
        if (num) {
            const fetchProducts = async () => {
                const filteredProducts = productsState.allProducts[num];
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
                setImgSrc(Fruits);
                break;
            case 2:
                setImgSrc(Vegetables);
                break;
            case 3:
                setImgSrc(Cheese);
                break;
            case 4:
                setImgSrc(Vegetables);
                break;
            case 5:
                setImgSrc(Farm);
                break;
            case 6:
                setImgSrc(Popc);
                break;
            default:
                break;
        }
        if (num) setVisible(true);
    }, [num]);
    return (
        <>
            {visible && (
                <div
                    className="dropdown-container"
                    onMouseLeave={handleMouseLeave}
                    style={{
                        position: "absolute",
                        top: "70px",
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
                        <img
                            onClick={handleImageClick}
                            src={imgSrc.src}
                            style={{
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
                            {products?.map((currentProduct) => (
                                <div
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

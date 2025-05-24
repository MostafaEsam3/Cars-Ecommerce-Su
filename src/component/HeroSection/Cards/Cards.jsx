import React, { useContext, useEffect, useState } from "react";
import "./Cards.css";
import productImage from "./../../../assets/g92-2-500x500 1.svg";
import CardTemplate from "./CardTemplate";
import Withcomp from "../../WithComp/WithComp";
import { scrollerContext } from "../../context/context";
import WithComp from "../../HighOrderComp/HighOrderComp";
import { useFetchData } from "../../../hooks/useFetch";
import Category from "../CategorySection/Category";
import SecondHero from "../SecondHero/SecondHero";
import axios from "axios";

const Cards = ({ Scroll, changeScroll }) => {
  const {
    Data: CategoryData,
    setData: setCategoryData,
    fetchData: fetchCategory,
  } = useFetchData(
    "http://127.0.0.1:8000/dashboard/categories",
    "categoryData"
  );
  const {
    Data: ProductData,
    setData: setProductData,
    fetchData: fetchProduct,
  } = useFetchData(
    "http://127.0.0.1:8000/dashboard/panelings",
    "panelingsData"
  );

  const handleFilterAccCategory = async (id) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/products-by-category-id/${id}`
      );
      console.log(response);
      setProductData(response?.data?.data || []);
      console.log(ProductData.length);
    } catch (err) {
      console.log(err);
    }
  };

  const returnAllProducts = () => {
    fetchProduct();
    setProductData(ProductData);
  };
  useEffect(() => {
    // I NEED PRICE IN THIS PRODUCT
    console.log(ProductData);
    fetchCategory();
    fetchProduct();
  }, []);

  return (
    <>
      <Category
        Data={CategoryData}
        handleFilterAccCategory={handleFilterAccCategory}
      />
      <SecondHero returnAllProducts={returnAllProducts} />
      <div
        className={
          Scroll
            ? "wraber row justify-content-between mainFont"
            : " row justify-content-between flex-wrap mainFont"
        }
      >
        {/* {
    ProductData?.map((ele,index)=>{
        return  <CardTemplate name={ele?.name} description={ele?.description} image={ele.image} id={ele.id}/>
    })
 } */}
        <CardTemplate
          name={"ele?.name"}
          description={"ele?.description"}
          image={productImage}
          id={"ele.id"}
        />
        <CardTemplate
          name={"ele?.name"}
          description={"ele?.description"}
          image={productImage}
          id={"ele.id"}
        />
        <CardTemplate
          name={"ele?.name"}
          description={"ele?.description"}
          image={productImage}
          id={"ele.id"}
        />
        <CardTemplate
          name={"ele?.name"}
          description={"ele?.description"}
          image={productImage}
          id={"ele.id"}
        />
        <CardTemplate
          name={"ele?.name"}
          description={"ele?.description"}
          image={productImage}
          id={"ele.id"}
        />
        <CardTemplate
          name={"ele?.name"}
          description={"ele?.description"}
          image={productImage}
          id={"ele.id"}
        />
        <CardTemplate
          name={"ele?.name"}
          description={"ele?.description"}
          image={productImage}
          id={"ele.id"}
        />
        <CardTemplate
          name={"ele?.name"}
          description={"ele?.description"}
          image={productImage}
          id={"ele.id"}
        />
        <CardTemplate
          name={"ele?.name"}
          description={"ele?.description"}
          image={productImage}
          id={"ele.id"}
        />
        <CardTemplate
          name={"ele?.name"}
          description={"ele?.description"}
          image={productImage}
          id={"ele.id"}
        />
      </div>

      <div className="m-auto mt-4">
        <button
          className="btn btn-warning "
          style={{ display: "block", margin: "auto" }}
          onClick={() => changeScroll()}
        >
          {Scroll ? "عرض كل المنتجات" : "عرض أقل"}
        </button>
      </div>
      <div
        className="line bg-secondary mt-4"
        style={{ width: "100%", borderBottom: "1px solid #000000" }}
      ></div>
    </>
  );
};

export default WithComp(Cards);

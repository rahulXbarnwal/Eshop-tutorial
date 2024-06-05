import React, { useEffect, useState } from "react";
import { categoriesData, productsData } from "./ProductData";
import { useDispatch, useSelector } from "react-redux";

import { AiOutlinePlusCircle } from "react-icons/ai";
import { createProduct } from "../../redux/actions/product";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const { seller } = useSelector((state) => state.seller);
  const { success, error } = useSelector((state) => state.products);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [stock, setStock] = useState("");

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (success) {
      toast.success("Product created successfully!");
      navigate("/dashboard");
      window.location.reload();
    }
  }, [dispatch, error, success]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedProduct) {
      toast.error("Please select a product.");
      return;
    }

    const newProduct = {
      name: selectedProduct.name,
      description,
      category,
      tags,
      originalPrice,
      discountPrice,
      stock,
      shopId: seller._id,
      images,
    };

    dispatch(createProduct(newProduct));
  };

  // Filter products based on name and category
  const filteredProducts = productsData.filter(
    (product) =>
      product.name.toLowerCase().includes(name.toLowerCase()) &&
      (category === "" || product.category === category)
  );

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Product</h5>
      <form onSubmit={handleSubmit}>
        {/* Select product from filtered list */}
        {/* Category dropdown */}
        <div className="mt-4">
          <label className="pb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full mt-2 border h-[35px] rounded-[5px]"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose a category</option>
            {categoriesData.map((category, index) => (
              <option key={index} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-4">
          {/* Dropdown with input for searching */}
          <div className="relative">
            <input
              type="text"
              className="w-full mt-2 border h-[35px] rounded-[5px] px-3"
              placeholder="Search for a product"
              value={selectedProduct ? selectedProduct.name : name}
              onChange={(e) => setName(e.target.value)}
            />
            <select
              className="absolute top-0 left-0 w-full h-full border rounded-[5px] opacity-0 cursor-pointer"
              value={selectedProduct ? selectedProduct.name : ""}
              onChange={(e) => {
                const productName = e.target.value;
                setSelectedProduct(
                  productsData.find((product) => product.name === productName)
                );
                setName(productName);
              }}
            >
              <option value="">Select a product</option>
              {filteredProducts.map((product) => (
                <option key={product._id} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Product description */}
        <div className="mt-4">
          <label className="pb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            rows="4"
            className="w-full border rounded-[5px] px-3 py-2"
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        {/* Tags input */}
        <div className="mt-4">
          <label className="pb-2">Tags</label>
          <input
            type="text"
            className="w-full border rounded-[5px] px-3 py-2"
            placeholder="Enter product tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        {/* Original Price */}
        <div className="mt-4">
          <label className="pb-2">Original Price</label>
          <input
            type="number"
            className="w-full border rounded-[5px] px-3 py-2"
            placeholder="Enter original price"
            value={originalPrice}
            onChange={(e) => setOriginalPrice(e.target.value)}
          />
        </div>
        {/* Discounted Price */}
        <div className="mt-4">
          <label className="pb-2">Price (With Discount)</label>
          <input
            type="number"
            className="w-full border rounded-[5px] px-3 py-2"
            placeholder="Enter price with discount"
            value={discountPrice}
            onChange={(e) => setDiscountPrice(e.target.value)}
          />
        </div>
        {/* Stock */}
        <div className="mt-4">
          <label className="pb-2">Product Stock</label>
          <input
            type="number"
            className="w-full border rounded-[5px] px-3 py-2"
            placeholder="Enter product stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>
        {/* Upload Images */}
        <div className="mt-4">
          <label className="pb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <input type="file" multiple onChange={handleImageChange} />
          {/* Preview selected images */}
          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product ${index + 1}`}
                className="w-24 h-24 object-cover rounded border"
              />
            ))}
          </div>
        </div>
        {/* Create Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProduct;

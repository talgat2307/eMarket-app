import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProduct,
  fetchProductDetail,
} from '../store/actions/productsActions';

const ProductDetails = ({ match, history }) => {
  const dispatch = useDispatch();
  const product = useSelector(state => state.products.productDetail);

  useEffect(() => {
    dispatch(fetchProductDetail(match.params.id));
  }, [dispatch, match.params.id]);

  const deleteClick = (id) => {
    dispatch(deleteProduct(id));
    history.push('/');
  };

  return (
    <div>
      <h3 className='py-4'>{product && product.title}</h3>
      <div className='mb-4 product-image'>
        {product && product.image ?
          <img src={`http://localhost:8000/uploads/${product && product.image}`}
               alt="" width={400}/> :
          ''
        }
      </div>
      <p>{product && product.description}</p>
      <li>Price: ${product && product.price}</li>
      <li>Category: {product && product.category.title}</li>
      <li>Seller: {product && product.user.display_name}</li>
      <li>Phone: {product && product.user.phone_number}</li>
      <button onClick={() => deleteClick(product._id)} className='btn-dark mt-4'>Delete</button>
    </div>
  );
};

export default ProductDetails;
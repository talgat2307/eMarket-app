import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProductsByCategory,
} from '../store/actions/productsActions';
import { Card, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductsByCategory = ({ location, history }) => {

  const dispatch = useDispatch();
  const products = useSelector(state => state.products.productsByCategory);

  const params = new URLSearchParams(location.search);
  const queryId = params.get('category');

  useEffect(() => {
    dispatch(fetchProductsByCategory(queryId));
  }, [dispatch, queryId]);

  let categoryTitle;
  if (products) {
    categoryTitle = products[0].category.title;
  }

  return (
    <>
      <h3>{categoryTitle}</h3>
      <Row className='justify-content-start'>
        {products && products.map(product => {
          return (
            <Card key={product._id} style={{ width: '25%' }}>
              {product.image ?
                <Card.Img
                  variant="top"
                  height={220}
                  src={`http://localhost:8000/uploads/${product.image}`}
                /> :
                <Card.Img
                  variant="top"
                  height={220}
                  src="https://community.pipl.ua/wp-content/themes/qaengine/img/default-thumbnail.jpg"
                />
              }
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Link to={`products/${product._id}`}>More information</Link>
              </Card.Body>
            </Card>
          );
        })}
      </Row>

    </>
  );
};

export default ProductsByCategory;
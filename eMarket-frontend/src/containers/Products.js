import React, { useEffect } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/actions/categoriesActions';
import { fetchProducts } from '../store/actions/productsActions';

const Products = () => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);
  const products = useSelector(state => state.products.products);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <>
      <Row className='flex-lg-row'>
        <Col xs={2}>
          <li><Link to={'/'}>All item</Link></li>
          {categories && categories.map(category => {
            return (
              <li key={category._id}><Link
                to={`/products?category=${category._id}`}>{category.title}</Link>
              </li>
            );
          })}
        </Col>
        <Col>
          <Row>
            <h2 className='pl-3'>All items</h2>
          </Row>
          <Row className='justify-content-start'>
            {products && products.map(product => {
              return (
                <Card key={product._id} style={{ width: '30%' }}>
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

        </Col>
      </Row>
    </>
  );
};

export default Products;
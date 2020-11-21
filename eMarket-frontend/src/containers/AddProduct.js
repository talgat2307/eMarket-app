import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../store/actions/categoriesActions';
import { addProduct } from '../store/actions/productsActions';

const AddProduct = (props) => {
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categories.categories);

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    category: '',
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const inputChangeHandler = e => {
    const name = e.target.name;
    const value = e.target.value;
    setProduct(prevState => {
      return { ...prevState, [name]: value };
    });
  };
  const fileChangeHandler = e => {
    const name = e.target.name;
    const file = e.target.files[0];

    setProduct(prevState => ({ ...prevState, [name]: file }));
  };

  const submitFormHandler = e => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(product).forEach(key => {
      formData.append(key, product[key]);
    });

    dispatch(addProduct(formData));
    props.history.push('/');
  };

  return (
    <div>
      <Container>
        <Row className='justify-content-md-center'>
          <Col xs={12} md={6}>
            <h2 className='py-4'>Add new product</h2>
            <Form onSubmit={(e) => submitFormHandler(e)}>
              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  name='title'
                  value={product.title}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='textarea'>
                <Form.Label>Description</Form.Label>
                <textarea
                  className='form-control'
                  rows='6'
                  name='description'
                  value={product.description}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </textarea>
              </Form.Group>
              <Form.Group controlId='price'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='text'
                  name='price'
                  value={product.price}
                  onChange={(e) => inputChangeHandler(e)}
                >
                </Form.Control>
              </Form.Group>
              <Form.Group controlId='image'>
                <Form.Label>Image</Form.Label>
                <Form.File
                  name='image'
                  onChange={fileChangeHandler}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Categories</Form.Label>
                <Form.Control
                  name='category'
                  value={product.category}
                  onChange={(e) => inputChangeHandler(e)}
                  as="select"
                >
                  <option hidden>Select category</option>
                  {categories && categories.map(category => {
                    return (
                      <option key={category._id} value={category._id}>{category.title}</option>
                    );
                  })}
                </Form.Control>
              </Form.Group>

              <Button className='mt-3' type='submit' variant='primary'>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddProduct;
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { Formik } from 'formik';
import { usePostDevice } from '../hooks/usePostDevice'

export const AddSystemModalComponent = ({ show, onHide, deviceTypeOptions }) => {
  const { setPostData, succcesData, isLoading } = usePostDevice();

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Header >
        <Modal.Title id="contained-modal-title-vcenter">
          Add System
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ system_name: '', type: '', hdd_capacity: '' }}
          validate={values => {
            const errors = {};
            // if (!values.email) {
            //   errors.email = 'Required';
            // } else if (
            //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            // ) {
            //   errors.email = 'Invalid email address';
            // }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const {system_name, type, hdd_capacity} = values
            setPostData({ system_name, type, hdd_capacity });
            setSubmitting(false);
            onHide();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>System Name</Form.Label>
                <Form.Control type="text" name="system_name"  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.system_name} />
                <Form.Text className="text-danger">
                  {errors.system_name && touched.system_name && errors.system_name}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" as={Col} controlId="formGridState">
                <Form.Label>Type</Form.Label>
                <Form.Select name="type"  onChange={handleChange} defaultValue="Choose...">
                  {deviceTypeOptions.map((type)=> <option value={type} key={type} >{type}</option>)}
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.type && touched.type && errors.type}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>HDD Capacity GB</Form.Label>
                <Form.Control type="number"  name="hdd_capacity" onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.hdd_capacity}
                />
                <Form.Text className="text-danger">
                  {errors.hdd_capacity && touched.hdd_capacity && errors.hdd_capacity}
                </Form.Text>
              </Form.Group>
              <Button onClick={onHide} className="mx-3">Close</Button>
              <Button variant="primary" type="submit" onSubmit={handleSubmit} disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Modal.Body>

    </Modal>
  );
};

{/*<form> <div className="row">
                <div  className="col-5">
                <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
                </div>
              </div>
              <div className="row">
                <div  className="col-5">

                </div>
              </div>
              <div className="row">
                <div  className="col-5">

                <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
                </div>
              </div>
           
              {errors.password && touched.password && errors.password}
              <Button onClick={onHide}>Close</Button>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>  </form>*/}
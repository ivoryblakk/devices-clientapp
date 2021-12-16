import React from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { Formik } from 'formik';
import { addDevice } from './slice';
import { useDispatch } from 'react-redux'
import { parseTypeString } from '../../utilites/utility';
import { validateDeviceInput } from '../../utilites/validation';

export const AddSystemModalComponent = ({ show, onHide, deviceTypeOptions }) => {
  const dispatch = useDispatch()
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
          Add System Device
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ system_name: '', type: '', hdd_capacity: '' }}
          validate={(values) => validateDeviceInput(values)}
          onSubmit={ async(values, { setSubmitting }) => {
            const { system_name, type, hdd_capacity } = values
            await dispatch(addDevice({ system_name: system_name.toUpperCase(), type,hdd_capacity: hdd_capacity }));
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
            isSubmitting
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>System Name</Form.Label>
                <Form.Control type="text" name="system_name" onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.system_name} />
                <Form.Text className="text-danger">
                  {errors.system_name && touched.system_name && errors.system_name}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" as={Col} controlId="formGridState">
                <Form.Label>Type</Form.Label>
                <Form.Select name="type" onChange={handleChange} >
                <option value={''}>Choose...</option>
                  {deviceTypeOptions.map((type) => <option value={type} key={type} >{parseTypeString(type)}</option>)}
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors.type && touched.type && errors.type}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>HDD Capacity GB</Form.Label>
                <Form.Control type="number" name="hdd_capacity" onChange={handleChange}
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

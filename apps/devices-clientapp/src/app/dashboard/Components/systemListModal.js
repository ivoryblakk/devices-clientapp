import React from 'react';
import { Modal, Button, Form, Col } from 'react-bootstrap'
import { Formik } from 'formik';
import { updateDevice, deleteDevice, fetchDevices, addDevice } from './slice';
import { parseTypeString } from '../../utilites/utility';
import { useDispatch, useSelector } from 'react-redux'
import { validateDeviceInput } from '../../utilites/validation';
import { TYPE, SYSTEM_NAME, HDD_CAPACITY, initialDeviceDetails } from './devicesList';

export const SystemListModalComponent = ({ deviceTypeOptions, deviceDetails, show, onHide, isEditSystemDevice }) => {
  const dispatch = useDispatch()
  const title = isEditSystemDevice ? 'Edit System Details' : ' Add System Device'
  const initialValues = isEditSystemDevice ? { system_name: deviceDetails[SYSTEM_NAME], type: deviceDetails[TYPE], hdd_capacity: Number(deviceDetails[HDD_CAPACITY]) } : initialDeviceDetails
  const { errorModal } = useSelector(state => state.devicesList)

  const handleAddSystem = async (values, { setSubmitting }) => {
    const { system_name, type, hdd_capacity } = values
    await dispatch(addDevice({ system_name: system_name.toUpperCase(), type, hdd_capacity }));
    setSubmitting(false);
    onHide();
    dispatch(fetchDevices());
  }

  const handleUpdateSystem = async (values, { setSubmitting }) => {
    const { system_name, type, hdd_capacity } = values
    await dispatch(updateDevice({ system_name: system_name.toUpperCase(), type, hdd_capacity, id: deviceDetails.id }));
    setSubmitting(false);
    onHide();
    dispatch(fetchDevices());
  }


  const handleDelete = async () => {
    await dispatch(deleteDevice({ id: deviceDetails.id }))
    await dispatch(fetchDevices());
    onHide();
  }

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
          {title}
        </Modal.Title>
        {isEditSystemDevice ? <Button className="btn-danger" onClick={handleDelete}
        >Delete System Device</Button> : null}
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={initialValues}
          validate={(values) => validateDeviceInput(values)}
          onSubmit={isEditSystemDevice ? handleUpdateSystem : handleAddSystem}
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
              <Form.Group className="mb-3" controlId={SYSTEM_NAME}>
                <Form.Label>System Name</Form.Label>
                <Form.Control type="text" name="system_name" onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[SYSTEM_NAME]} />
                <Form.Text className="text-danger">
                  {errors[SYSTEM_NAME] && touched[SYSTEM_NAME] && errors[SYSTEM_NAME]}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" as={Col} controlId={TYPE}>
                <Form.Label>Type</Form.Label>
                <Form.Select name="type" defaultValue={isEditSystemDevice ? deviceDetails[TYPE] : ''} onChange={handleChange}>
                  <option value={''}>Choose...</option>
                  {deviceTypeOptions.map((type) => <option value={type} key={type} >{parseTypeString(type)}</option>)}
                </Form.Select>
                <Form.Text className="text-danger">
                  {errors[TYPE] && touched[TYPE] && errors[TYPE]}
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId={HDD_CAPACITY}>
                <Form.Label>HDD Capacity GB</Form.Label>
                <Form.Control type="number" name="hdd_capacity" onChange={handleChange}
                  onBlur={handleBlur}
                  value={values[HDD_CAPACITY]}
                />
                <Form.Text className="text-danger">
                  {errors[HDD_CAPACITY] && touched[HDD_CAPACITY] && errors[HDD_CAPACITY]}
                </Form.Text>
              </Form.Group>
              <Button onClick={onHide} className="mx-3">Close</Button>
              <Button variant="primary" id="submit" type="submit" onSubmit={handleSubmit} disabled={isSubmitting}>
                Submit
              </Button>
              <br />
              {errorModal && <span className="danger"> Somthing went wrong</span>}

            </Form>
          )}
        </Formik>
      </Modal.Body>

    </Modal>
  );
};


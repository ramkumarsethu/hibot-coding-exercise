import React, { useState } from 'react';
import { FORM_TYPE, FormEntity } from '../../types/Form';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { addToStore, updateValueInStore } from '../../store/slices/FormSlice';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { formFieldsConfig } from 'src/config/config';
import ToastMessage from './Toast';

type FormConfig = {
  formType: FORM_TYPE;
  id?: string;
  useFullGrid?: boolean;
  buttonLabel?: string;
  preSubmitHandler?: (entity: FormEntity) => boolean;
  postSubmitHandler?: () => void;
};

const BasicForm: React.FC<FormConfig> = ({
  formType,
  id,
  useFullGrid,
  buttonLabel,
  preSubmitHandler = () => true,
  postSubmitHandler = () => {
    /**/
  }
}: FormConfig) => {
  const fields = formFieldsConfig[formType];
  const dispatch = useAppDispatch();
  const data = useAppSelector((e) => e.entities);
  const [showToastMessage, setShowToastMessage] = useState(false);

  const validationSchema = yup.object().shape(
    fields.reduce<Record<string, yup.Schema>>((acc, cur) => {
      if (cur.validationRule) {
        acc[cur.name] = cur.validationRule;
      }
      return acc;
    }, {})
  );

  type T = yup.InferType<typeof validationSchema>;

  return (
    <>
      <Formik<T>
        validationSchema={validationSchema}
        onSubmit={(values, { resetForm }) => {
          //following code (basically this handler) is executed only on successful vaidation of the input fields
          const valuesToBeSaved = { ...values, _type: formType, id: id || '' };
          const submitFlag = preSubmitHandler(valuesToBeSaved);
          if (submitFlag) {
            if (id) {
              dispatch(updateValueInStore(valuesToBeSaved));
            } else {
              dispatch(addToStore(valuesToBeSaved)); //id is set empty to satisfy the ts compiler. but is set in the reducer before storing in store
            }

            setShowToastMessage(true);
            !id && resetForm(); //reset the form only for new data
            postSubmitHandler();
          }
        }}
        initialValues={id ? data[formType].find((e) => e.id === id) || {} : {}}
        initialTouched={fields.reduce<{ [P in keyof T]: boolean }>((acc, cur) => {
          acc[cur.name] = true;
          return acc;
        }, {})}
        validateOnChange>
        {/* going with the render props implementation of Formik to pass handler functions and other props to the Form component */}
        {({ handleSubmit, handleChange, values, errors }) => {
          const errorValues = Object.values(errors);
          return (
            <Form noValidate onSubmit={handleSubmit}>
              {fields.map((fieldConfig) => {
                const { name, displayName, type, placeholderText, referenceEntity } = fieldConfig;
                const key = name as keyof T;
                return (
                  <Row key={name}>
                    {/* using the full grid for the update form as it will be shown in modal */}
                    <Col md={id || useFullGrid ? 12 : 8} sm={12} className="pb-2">
                      <Form.Group>
                        {type !== 'Hidden' && (
                          <Form.Label className="mb-0">{displayName}</Form.Label>
                        )}
                        {type === 'TextField' && (
                          <Form.Control
                            size="sm"
                            type="text"
                            isInvalid={!!errors[key]}
                            name={name}
                            value={values[key] || ''}
                            onChange={handleChange}
                            placeholder={placeholderText}
                            autoComplete="off"
                            spellCheck="false"
                          />
                        )}
                        {type === 'Password' && (
                          <Form.Control
                            size="sm"
                            type="password"
                            isInvalid={!!errors[key]}
                            name={name}
                            value={values[key] || ''}
                            onChange={handleChange}
                            placeholder={placeholderText}
                            autoComplete="off"
                            spellCheck="false"
                          />
                        )}
                        {type === 'TextArea' && (
                          <Form.Control
                            size="sm"
                            isInvalid={!!errors[key]}
                            name={name}
                            value={values[key] || ''}
                            onChange={handleChange}
                            placeholder={placeholderText}
                            autoComplete="off"
                            spellCheck="false"
                            as="textarea"
                            rows={4}
                          />
                        )}
                        {type === 'Dropdown' && referenceEntity && (
                          <Form.Select
                            size="sm"
                            isInvalid={!!errors[key]}
                            name={name}
                            value={values[key] || ''}
                            onChange={handleChange}>
                            <option value=""></option>
                            {data[referenceEntity.referenceType].map((e) => {
                              return (
                                <option key={e.id} value={e.id}>
                                  {e[referenceEntity.referenceDisplayLabel]}
                                </option>
                              );
                            })}
                          </Form.Select>
                        )}
                        <Form.Control.Feedback type="invalid">
                          {errors[key] as []}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                );
              })}
              <Row>
                {/* using the full grid for the update form as it will be shown in modal */}
                <Col
                  md={id || useFullGrid ? 12 : 8}
                  className="d-grid d-md-flex justify-content-md-center pt-2">
                  <Button
                    disabled={errorValues.length > 0}
                    variant="primary"
                    size="sm"
                    className="col-md-4"
                    type="submit">
                    {buttonLabel || (id ? 'Update' : 'Create')}
                  </Button>
                </Col>
              </Row>
            </Form>
          );
        }}
      </Formik>

      <ToastMessage showToastMessage={showToastMessage} onClose={() => setShowToastMessage(false)}>
        {id ? 'Data updated successfully' : 'Data created successfully'}
      </ToastMessage>
    </>
  );
};

export default BasicForm;

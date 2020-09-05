import react, { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
} from 'react-bootstrap';
import React from 'react';
import HelmetConfig from '../../helmet/HelmetConfig';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { resetPassword, resetPasswordRequest } from '../../../services/passwordReset';
import routeConfig from '../../../routes.config';

const PasswordResetRequest: React.FunctionComponent = () => {
  const { userId, key1, key2 } = useParams();
  const [redirectToSignIn, setRedirectToSignIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit = (event: react.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const emailAddress: string = event.target[0].value;

    resetPasswordRequest(emailAddress)
      .then(res => {
        setRedirectToSignIn(true);
      })
      .catch(reason => {
        setErrorMessage(
          'Ocorreu um problema ao solicitar a alteração de senha.'
        );
      });
  };

  return (
    <Container fluid className="d-flex h-100">
      {redirectToSignIn && <Redirect to={routeConfig.signIn} />}
      <HelmetConfig title="Alteração de senha" />
      <Row className="align-items-center w-100">
        <Col md={{ span: 4, offset: 4 }}>
          <Card>
            <Card.Header>
              <FontAwesomeIcon icon={faKey} /> Recuperar a senha
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group controlId="email">
                  <Form.Label>Endereço de e-mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Insira o endereço de e-mail"
                    required
                  ></Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary">
                  Enviar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PasswordResetRequest;

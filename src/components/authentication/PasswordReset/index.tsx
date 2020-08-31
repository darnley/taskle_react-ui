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
import { resetPassword } from '../../../services/passwordReset';
import routeConfig from '../../../routes.config';

const PasswordReset: React.FunctionComponent = () => {
  const { userId, key1, key2 } = useParams();
  const [redirectToSignIn, setRedirectToSignIn] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const onSubmit = (event: react.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    debugger;

    const password: string = event.target[0].value;

    resetPassword(userId!, key1!, key2!, password)
      .then(res => {
        setRedirectToSignIn(true);
      })
      .catch(reason => {
        setErrorMessage(
          'Ocorreu um problema ao alterar a sua senha. Verifique se está acessando o mesmo endereço enviado para seu e-mail e se já não foi utilizado.'
        );
      });
  };

  return (
    <Container fluid className="d-flex h-100">
      {redirectToSignIn && <Redirect to={routeConfig.signIn} />}
      <HelmetConfig title="Alteração de senha" />
      <Row className="align-items-center w-100">
        <Col md={{ span: 2, offset: 5 }}>
          <Card>
            <Card.Header>
              <FontAwesomeIcon icon={faKey} /> Alterar a senha
            </Card.Header>
            <Card.Body>
              <Form onSubmit={onSubmit}>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Form.Group controlId="password">
                  <Form.Label>Nova senha</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Insira a nova senha"
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

export default PasswordReset;

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Auth from '../../../utils/authentication';
import { Redirect } from 'react-router-dom';
import routeConfig from '../../../routes.config';
import HelmetConfig from '../../helmet/HelmetConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faCircleNotch,
} from '@fortawesome/free-solid-svg-icons';
import {
  Container,
  Card,
  Form,
  Button,
  Alert,
  Col,
  Row,
} from 'react-bootstrap';
import RBRef from '../../../types/RBRef';
import classNames from 'classnames';

interface IFormLoginData {
  username: string;
  password: string;
}

const SignIn = ({ component, ...rest }) => {
  const alertTimeoutInMs: number = 30000;
  const [redirectToReferrer, setRedirectToReferrer] = useState(false);
  const [authError, setAuthError] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const { register, handleSubmit, errors } = useForm<IFormLoginData>();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Submit the login data.
   */
  const onSubmit = handleSubmit(data => {
    setIsLoading(true);

    Auth.signIn(data.username, data.password)
      .then(v => {
        setRedirectToReferrer(true);
      })
      .catch(reason => {
        if (reason?.data?.message) {
          setAuthError(reason.data.message);
        } else {
          setAuthError(
            `A seguinte mensagem foi retornada pelo nosso serviço: ${reason.message}`
          );
        }

        setShowAlert(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  });

  useEffect(() => {
    // Set auto hide for alert
    if (showAlert) {
      setTimeout(() => {
        setShowAlert(false);
      }, alertTimeoutInMs);
    }
  }, [showAlert]);

  if (!Auth.isAuthenticated && !redirectToReferrer) {
    return (
      <Container fluid>
        <HelmetConfig title="Autenticação" />
        <Row className="align-middle">
          <Col md={{ span: 4, offset: 4 }}>
            <Card>
              <Card.Body>
                {showAlert && authError.length > 0 && (
                  <>
                    <Alert
                      variant="danger"
                      onClose={() => setShowAlert(false)}
                      dismissible
                    >
                      <Alert.Heading>Oops!</Alert.Heading>
                      {authError ? (
                        <span>{authError}</span>
                      ) : (
                        <span>Ocorreu um problema ao autenticar você.</span>
                      )}
                    </Alert>
                    <hr />
                  </>
                )}
                <Form onSubmit={onSubmit}>
                  <Form.Group controlId="username">
                    <Form.Label>Endereço de e-mail</Form.Label>
                    <Form.Control
                      type="email"
                      name="username"
                      placeholder="Insira o seu endereço de e-mail"
                      className={classNames({
                        'is-invalid': errors.username,
                      })}
                      ref={
                        register({
                          required: true,
                        }) as RBRef
                      }
                    />
                    <Form.Text className="text-muted">
                      Não compartilhe o endereço de e-mail com ninguém.
                    </Form.Text>
                    {errors.username && (
                      <Form.Text className="invalid-feedback">
                        O endereço de e-mail inserido é inválido.
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Form.Group controlId="password">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      className={classNames({
                        'is-invalid': errors.password,
                      })}
                      ref={register({ required: true }) as RBRef}
                    />
                    {errors.password && (
                      <Form.Text className="invalid-feedback">
                        A senha inserida é inválida.
                      </Form.Text>
                    )}
                  </Form.Group>
                  <Button variant="primary" type="submit" disabled={isLoading}>
                    <span className="mr-2 text-light">Entrar</span>
                    <span className="text-light">
                      {!isLoading && <FontAwesomeIcon icon={faChevronRight} />}
                      {isLoading && (
                        <FontAwesomeIcon icon={faCircleNotch} spin />
                      )}
                    </span>
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return <Redirect to={{ pathname: routeConfig.homepage }} />;
  }
};

export default SignIn;

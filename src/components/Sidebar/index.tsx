import React, { FunctionComponent, useContext, useState } from 'react';
import './styles.scss';
import { Container, Card, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import SidebarContext from '../../contexts/SidebarContext';
import PerfectScrollbar from 'react-perfect-scrollbar';

interface ISidebarProps { }

const Sidebar: FunctionComponent<ISidebarProps> = props => {
  const sidebarContext = useContext(SidebarContext);
  const [goBackConfirmation, setGoBackConfirmation] = useState<boolean>(false);

  const handleGoBackClick = (e: React.FormEvent<HTMLButtonElement>) => {
    if (!goBackConfirmation) return;
    e.preventDefault();
    sidebarContext.setSidebarComponent(null);
  };

  return (
    <>
      {/* <div id="right-sidebar" className="h-100 pr-0">
        <Container fluid className="pt-2">
          
        </Container>
      </div> */}
      <Card className="mt-3 h-100" id="right-sidebar">
        <Card.Text className="mb-0 right-sidebar-top-navigation">
          {goBackConfirmation && (
            <div>
              <span>Tem certeza?</span>
              <ButtonGroup className="float-right">
                <Button
                  variant={'success'}
                  size={'sm'}
                  onClick={handleGoBackClick}
                >
                  Sim
                </Button>
                <Button
                  variant={'danger'}
                  size={'sm'}
                  onClick={() => setGoBackConfirmation(false)}
                >
                  Não
                </Button>
              </ButtonGroup>
            </div>
          )}
          {!goBackConfirmation && (
            <Button
              variant={'light'}
              onClick={() => setGoBackConfirmation(true)}
              size={'sm'}
            >
              <FontAwesomeIcon icon={faAngleLeft} className="mr-1" /> Voltar
            </Button>
          )}
        </Card.Text>
        <Card.Body style={{ height: '80vh' }}>
          <PerfectScrollbar>{props.children}</PerfectScrollbar>
        </Card.Body>
      </Card>
    </>
  );
};

export default Sidebar;

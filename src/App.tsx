import React, { FunctionComponent, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'typeface-roboto';
import './App.scss';
import HelmetConfig from './components/helmet/HelmetConfig';
import Menu from './components/Menu';
import Sidebar from './components/Sidebar';
import SidebarContext, { ISidebarContext } from './contexts/SidebarContext';

interface IAppProps {
  middleComponent: any;
  sidebarComponent?: any;
}

const App: FunctionComponent<IAppProps> = props => {
  const [sidebarComponent, setSidebarComponent] = useState<any>();
  const [middleComponent, setMiddleComponent] = useState<any>();

  const sidebarContextValue: ISidebarContext = {
    sidebarComponent,
    setSidebarComponent,
  };

  useMemo(() => {
    setMiddleComponent(props.middleComponent);
  }, [props.middleComponent]);

  useMemo(() => {
    if (props.sidebarComponent) {
      setSidebarComponent(props.sidebarComponent);
    }
  }, [props.sidebarComponent]);

  return (
    <>
      <SidebarContext.Provider value={sidebarContextValue}>
        <SidebarContext.Consumer>
          {({ sidebarComponent, setSidebarComponent }) => (
            <>
              <HelmetConfig title="Início" />

              <Container fluid id="main-container" className="h-100">
                <Row className="h-100">
                  <Col xs={2} id="menu-section">
                    <Menu />
                  </Col>
                  <Col xs={8} id="main-section">
                    {middleComponent ?? 'Sem componente no meio.'}
                  </Col>
                  <Col xs={2} id="right-bar-section" className="pr-0">
                    {sidebarComponent && <Sidebar>{sidebarComponent}</Sidebar>}
                  </Col>
                </Row>
              </Container>
            </>
          )}
        </SidebarContext.Consumer>
      </SidebarContext.Provider>
    </>
  );
};

export default App;

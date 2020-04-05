import React, { FunctionComponent, useMemo, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'typeface-roboto';
import './App.scss';
import HelmetConfig from './components/helmet/HelmetConfig';
import Menu from './components/Menu';
import Sidebar from './components/Sidebar';
import LoadingContext, { ILoadingContext } from './contexts/LoadingContext';
import SidebarContext, { ISidebarContext } from './contexts/SidebarContext';
import UserInfoContext, { IUserInfoContext } from './contexts/UserInfoContext';
import { IUser } from './interfaces/IUser';
import getAuthenticatedUser from './services/user/getAuthenticatedUser';

interface IAppProps {
  middleComponent: any;
  sidebarComponent?: any;
}

const App: FunctionComponent<IAppProps> = props => {
  const [sidebarComponent, setSidebarComponent] = useState<any>();
  const [middleComponent, setMiddleComponent] = useState<any>();

  const [userInfo, setUserInfo] = useState<IUser>();
  const [isLoading, setIsLoading] = useState(false);

  const loadingContextValue: ILoadingContext = {
    isLoading,
    setLoading: setIsLoading,
  };

  const sidebarContextValue: ISidebarContext = {
    sidebarComponent,
    setSidebarComponent,
  };

  const userInfoContextValue: IUserInfoContext = {
    user: userInfo,
  };

  const updateUserInfo = () => {
    return new Promise<IUser>((resolve, reject) => {
      getAuthenticatedUser()
        .then(user => {
          setUserInfo(user);
          resolve(user);
        })
        .catch(err => {
          reject(err);
        });
    });
  };

  useMemo(() => {
    const initialPromises: Promise<any>[] = [updateUserInfo()];

    Promise.all(initialPromises)
      .then(() => {
        // Update user information every 5 minutes
        setInterval(() => {
          updateUserInfo();
        }, 300000);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

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
      <LoadingContext.Provider value={loadingContextValue}>
        <LoadingContext.Consumer>
          {({ isLoading, setLoading }) => (
            <UserInfoContext.Provider value={userInfoContextValue}>
              <UserInfoContext.Consumer>
                {({ user, getUserInfo, checkAuth }) => (
                  <SidebarContext.Provider value={sidebarContextValue}>
                    <SidebarContext.Consumer>
                      {({ sidebarComponent, setSidebarComponent }) => (
                        <>
                          <HelmetConfig title="Início" />

                          <Container
                            fluid
                            id="main-container"
                            className="h-100"
                          >
                            <Row className="h-100">
                              <Col xs={2} id="menu-section">
                                <Menu />
                              </Col>
                              <Col xs={8} id="main-section">
                                {middleComponent ?? 'Sem componente no meio.'}
                              </Col>
                              <Col
                                xs={2}
                                id="right-bar-section"
                                className="pr-0"
                              >
                                {sidebarComponent && (
                                  <Sidebar>{sidebarComponent}</Sidebar>
                                )}
                              </Col>
                            </Row>
                          </Container>
                        </>
                      )}
                    </SidebarContext.Consumer>
                  </SidebarContext.Provider>
                )}
              </UserInfoContext.Consumer>
            </UserInfoContext.Provider>
          )}
        </LoadingContext.Consumer>
      </LoadingContext.Provider>
    </>
  );
};

export default App;

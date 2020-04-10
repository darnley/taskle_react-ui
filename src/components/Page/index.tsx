import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './styles.scss';

export interface IPageProps {
  name: string;
  /**
   * The default tab. It must be the value of `eventKey` of a Tab.
   */
  defaultTab?: string;
  tabs?: any[];
}

const Page: React.FunctionComponent<IPageProps> = props => {
  const [defaultTab, setDefaultTab] = useState('page-title');

  useEffect(() => {
    // If the current page contains tabs
    if (props.tabs && props.tabs.length > 0 && props.defaultTab) {
      setDefaultTab(props.defaultTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div id="middle-tabs-container">
        <Tabs id="middle-tabs" defaultActiveKey={defaultTab}>
          <Tab
            eventKey="page-title"
            title={props.name ?? 'Página'}
            id="middle-tab-title"
            className="middle-tab-title"
          >
            {props.children}
          </Tab>
          {props.tabs?.map(tab => tab)}
        </Tabs>
      </div>
    </>
  );
};

export default Page;

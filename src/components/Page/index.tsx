import React, { useState, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import './styles.scss';

export interface IPageProps {
  name: string;
  /**
   * The default tab. It must be the value of `eventKey` of a Tab.
   */
  defaultTab?: string;
  tabs?: React.ReactElement<Tab>[];
}

const Page: React.FunctionComponent<IPageProps> = props => {
  const [defaultTab, setDefaultTab] = useState('page-title');
  const [isTitleDisabled, setIsTitleDisabled] = useState(false);

  useEffect(() => {
    // If the current page contains tabs
    if (props.tabs && props.tabs.length > 0) {
      if (props.defaultTab) {
        setDefaultTab(props.defaultTab);
      }

      if (!props.children) {
        setIsTitleDisabled(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (newTabKey: string) => {
    setDefaultTab(newTabKey);
  };

  return (
    <>
      <div id="middle-tabs-container">
        <Tabs
          id="middle-tabs"
          activeKey={defaultTab}
          onSelect={handleTabChange}
        >
          <Tab
            eventKey="page-title"
            title={props.name ?? 'Página'}
            id="middle-tab-title"
            className="middle-tab-title"
            disabled={isTitleDisabled}
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

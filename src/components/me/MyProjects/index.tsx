import React, { FunctionComponent, useContext, useState, useMemo } from 'react';
import SidebarContext from '../../../contexts/SidebarContext';
import IProject from '../../../interfaces/IProject';
import getMyProjects from '../../../services/me/getMyProjects';
import ProjectItem from './ProjectItem';
import { InputGroup, FormControl, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreateOrEditProject from './CreateOrEditProject';
import Skeleton from 'react-loading-skeleton';

interface IMyProjectsProps {}

const MyProjects: FunctionComponent<IMyProjectsProps> = props => {
  const sidebarContext = useContext(SidebarContext);
  const [myProjects, setMyProjects] = useState<IProject[]>();
  const [myProjectsList, setMyProjectsList] = useState<IProject[]>();
  const [searchProject, setSearchProject] = useState('');

  useMemo(() => {
    getMyProjects().then(res => {
      setMyProjects(res);
      setMyProjectsList(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleProjectSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (searchProject !== e.currentTarget.value) {
      setSearchProject(e.currentTarget.value);
    }
  };

  const handleCreateProjectClick = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    sidebarContext.setSidebarComponent(<CreateOrEditProject />);
  };

  useMemo(() => {
    if (searchProject.trim().length > 0) {
      const found = myProjects?.filter(project =>
        project.description
          ?.toLocaleLowerCase()
          .includes(searchProject.toLocaleLowerCase())
      );

      setMyProjectsList(found);
    } else {
      setMyProjectsList(myProjects);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchProject, myProjects]);

  return (
    <>
      <div className="my-projects-header mb-3 d-flex">
        <InputGroup className="mr-3">
          <FormControl
            placeholder="Pesquisa pelo projeto..."
            onChange={handleProjectSearchChange}
          />
        </InputGroup>
        <span className="float-right">
          <Button className="text-nowrap" onClick={handleCreateProjectClick}>
            <FontAwesomeIcon icon={faPlus} className="mr-1" />
            Criar projeto
          </Button>
        </span>
      </div>
      <div className="project-list">
        {!myProjects && <Skeleton count={4} height={30} />}
        {myProjectsList &&
          myProjectsList.map((project, index, array) => (
            <ProjectItem project={project} key={`project-${index}`} />
          ))}
      </div>
    </>
  );
};

export default MyProjects;

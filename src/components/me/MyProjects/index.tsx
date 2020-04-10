import React, { FunctionComponent, useContext, useState, useMemo } from 'react';
import SidebarContext from '../../../contexts/SidebarContext';
import IProject from '../../../interfaces/IProject';
import getMyProjects from '../../../services/me/getMyProjects';
import ProjectItem from './ProjectItem';
import { InputGroup, FormControl } from 'react-bootstrap';

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
      <div className="my-projects-header mb-3 w-30">
        <InputGroup>
          <FormControl
            placeholder="Pesquisa pelo projeto..."
            onChange={handleProjectSearchChange}
          />
        </InputGroup>
      </div>
      <div className="project-list">
        {!myProjects && 'Obtendo dados...'}
        {myProjectsList &&
          myProjectsList.map((project, index, array) => (
            <ProjectItem project={project} key={`project-${index}`} />
          ))}
      </div>
    </>
  );
};

export default MyProjects;

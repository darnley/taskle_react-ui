import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import IProject from '../../../../interfaces/IProject';
import { getProject } from '../../../../services/project';
import { Button, Form } from 'react-bootstrap';

export interface IFinishProjectProps {
  projectId: string;
}

const FinishProject: React.FunctionComponent<IFinishProjectProps> = props => {
  const [project, setProject] = useState<IProject>();

  useEffect(() => {
    getProject(props.projectId)
      .then(p => {
        setProject(p);
      })
      .catch(err => {
        console.error(err);
      });
  }, [props.projectId]);

  return (
    <Form>
      <fieldset>
        <p className="text-muted">
          Dê estrelas para os que trabalharam bem no projeto.
        </p>
      </fieldset>
      <Button type="submit" variant="primary" block>
        Enviar
      </Button>
    </Form>
  );
};

export default FinishProject;

import React, { Component } from 'react';
import { Popover, ListGroup } from 'react-bootstrap';
import { IUser } from '../../interfaces/IUser';
import { getPerson } from '../../services/people';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';

export interface IUserDropdownPopoverProps {
  userId: string;
}

export interface IUserDropdownPopoverState {
  user: IUser | null;
  isLoading: boolean;
}

export default class UserDropdownPopover extends Component<
  IUserDropdownPopoverProps,
  IUserDropdownPopoverState
> {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      isLoading: false,
    };
  }

  componentWillMount() {
    this.setState({ isLoading: true });
    this.update().finally(() => {
      this.setState({ isLoading: false });
    });
  }

  update() {
    return Promise.all([
      getPerson(this.props.userId).then(res => {
        this.setState({ user: res });
      }),
    ]);
  }

  render() {
    return (
      <Popover {...this.props} id="user-information-dropdown-popover">
        <Popover.Content>
          {this.state.isLoading && 'Carregando...'}
          {!this.state.isLoading && this.state.user && (
            <>
              <p>
                Entrou em{' '}
                {new Intl.DateTimeFormat('pt-BR', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                }).format(new Date(this.state.user?.createdAt as string))}
              </p>
              {this.state.user?.position && (
                <p>Trabalha como {this.state.user?.position}</p>
              )}
              <p>
                {this.state.user.keywords.length === 0 &&
                  'Não possui palavras-chave.'}
                {this.state.user?.keywords.length > 0 && (
                  <>
                    <label>Palavras-chave</label>
                    <ListGroup className="user-info-typeahead-list-keywords">
                      {this.state.user &&
                        this.state.user.keywords.slice(0, 10).map(k => (
                          <ListGroup.Item className="py-1 px-2">
                            {k.name}
                            <span className="float-right">x{k.count}</span>
                          </ListGroup.Item>
                        ))}
                    </ListGroup>
                  </>
                )}
              </p>
            </>
          )}
        </Popover.Content>
      </Popover>
    );
  }
}

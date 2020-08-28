import authenticatedAxios from '../authenticatedAxios';
import ITeam from '../../interfaces/ITeam';
import { IUser } from '../../interfaces/IUser';

export function getAllTeams(): Promise<ITeam[]> {
  return new Promise<ITeam[]>((resolve, reject) => {
    authenticatedAxios
      .get<ITeam[]>('/teams')
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getTeam(teamId: string): Promise<ITeam> {
  if (!teamId) {
    throw Error("Param 'teamId' is required");
  }

  return new Promise<ITeam>((resolve, reject) => {
    authenticatedAxios
      .get<ITeam>(`/teams/${teamId}`)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function addTeam(team: ITeam): Promise<ITeam> {
  if (!team) {
    throw Error("Param 'team' is required.");
  }

  return new Promise<ITeam>((resolve, reject) => {
    authenticatedAxios
      .post<ITeam>(`/teams`, team)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function getTeamPeople(teamId: string): Promise<IUser[]> {
  if (!teamId) {
    throw Error("Param 'teamId' is required.");
  }

  return new Promise<IUser[]>((resolve, reject) => {
    authenticatedAxios
      .get<IUser[]>(`/teams/${teamId}/people`)
      .then(res => {
        resolve(res.data);
      })
      .catch(reject);
  });
}
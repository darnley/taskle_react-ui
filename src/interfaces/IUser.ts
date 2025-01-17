import Role from '../enums/Role';
import IUserKeyword from './IUserKeyword';
import ITeam from './ITeam';

/**
 * The system's user.
 * @interface IUser
 */
export interface IUser {
  _id: string;
  /**
   * The user's first name
   * @type {string}
   */
  firstName: string;

  /**
   * The user's last name
   * @type {string}
   */
  lastName: string;

  /**
   * The user' status
   * @type {boolean}
   */
  isActive: boolean;

  /**
   * The user's mail address
   * @type {string}
   */
  emailAddress: string;

  /**
   * The user's password.
   * It is encrypted.
   * @type {string}
   */
  password: string;

  /**
   * The user's password salt
   * @type {string}
   */
  salt: string;

  /**
   * The user's position (e.g. Software Developer)
   * @type {string}
   */
  position: string;

  /**
   * The user's permission role (e.g. Super user)
   * @type {Role}
   */
  role: Role;

  team: ITeam;

  starRating: number;

  starRatingCount: number;

  createdAt: string;

  updatedAt: string;

  keywords: IUserKeyword[];
}

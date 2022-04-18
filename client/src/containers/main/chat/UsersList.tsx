import { connect } from 'react-redux'
import UsersListComponent from '../../../components/main/chat/UsersList';

export const UsersList = connect((state: any) => ({
  users: state.users
}), {})(UsersListComponent);

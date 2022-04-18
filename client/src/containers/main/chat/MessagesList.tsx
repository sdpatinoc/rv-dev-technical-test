import { connect } from 'react-redux';
import MessagesListComponent from '../../../components/main/chat/MessagesList';

const mapStateToProps = (state: any) => ({
  messages: state.messages
});

export const MessagesList = connect(mapStateToProps, () => ({}))(MessagesListComponent);

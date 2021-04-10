import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import '../chat.css';

class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [], // message: {content: 'some message', self: true}
      typedMessage: '',
      hidden: false,
    };

    this.socket = io.connect('http://localhost:5000', {
      transports: ['websocket', 'polling', 'flashsocket'],
    });
    this.userEmail = props.user.email;
  }

  componentDidMount() {
    if (this.userEmail) {
      this.setupConnections();
    }
  }

  setupConnections = () => {
    const _this = this;

    this.socket.on('connect', function () {
      console.log('connection established using sockets...!');

      _this.socket.emit('join_room', {
        user_email: _this.userEmail,
        chatroom: 'connectusroom',
      });

      _this.socket.on('user_joined', function (data) {
        console.log('a user joined', data);
      });
    });

    this.socket.on('receive_message', function (data) {
      console.log('message received', data);
      //  add message to state
      const { messages } = _this.state;
      const newMessage = {};
      newMessage.content = data.message;
      newMessage.user_email = data.user_email;
      newMessage.sender = data.sender;
      newMessage.self = false;
      if (data.user_email === _this.userEmail) {
        newMessage.self = true;
        _this.setState({
          messages: [...messages, newMessage],
          typedMessage: '',
        });
      } else {
        _this.setState({
          messages: [...messages, newMessage],
        });
      }
    });
  };

  handleSubmit = () => {
    const _this = this;
    const { typedMessage } = this.state;

    if (typedMessage && this.userEmail) {
      this.socket.emit('send_message', {
        message: typedMessage,
        user_email: _this.userEmail,
        sender: _this.props.user.name,
        chatroom: 'connectusroom',
      });
    }
  };

  hideChatBox = () => {
    const { hidden } = this.state;
    this.setState({
      hidden: !hidden,
    });
  };

  render() {
    const { typedMessage, messages, hidden } = this.state;
    if (hidden) {
      return (
        <div className="chat-container-x">
          <div className="chat-header">
            Chat
            <img
              src="https://www.iconsdb.com/icons/preview/white/minus-5-xxl.png"
              alt=""
              height={17}
              onClick={this.hideChatBox}
            />
          </div>
        </div>
      );
    }
    if (!hidden) {
      return (
        <div className="chat-container">
          <div className="chat-header">
            Chat
            <img
              src="https://www.iconsdb.com/icons/preview/white/minus-5-xxl.png"
              alt=""
              height={17}
              onClick={this.hideChatBox}
            />
          </div>
          <div className="chat-messages">
            {messages.map((message, idx) => (
              <div
                className={
                  message.self
                    ? 'chat-bubble self-chat'
                    : 'chat-bubble other-chat'
                }
                key={idx}
              >
                <small>{message.user_email}</small>
                <p>{message.content}</p>
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={typedMessage}
              onChange={(e) => this.setState({ typedMessage: e.target.value })}
            />
            <button onClick={this.handleSubmit}>Submit</button>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps({ auth }) {
  return {
    user: auth.user,
  };
}

export default connect(mapStateToProps)(Chat);

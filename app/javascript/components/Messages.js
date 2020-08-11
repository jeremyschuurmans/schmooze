import React from "react"

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: []}
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
  }

  loadMessages = () => {
    const url = "/messages"
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong with the network response.");
        }
      })
      .then(response => this.setState({messages: response}));
  }

  handleMessageSubmit = (content) => {
    // event.preventDefault();
    const url = "/messages";
    const body = content;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then(response => this.setState({messages: response}))
  }

  componenentDidMount() {
    this.loadMessages();
  }

  render () {
    return (
      <React.Fragment>
        <MessageList messages={this.state.messages}/>
        <MessageForm onMessageSubmit={this.handleMessageSubmit}/>
      </React.Fragment>
    );
  }
}

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    const messages = this.props.messages.map((message) => {
      return(
        <li key={message.id}>{message.content}</li>
      )
    });
    return(
      <ul>{messages}</ul>
    );
  }
}

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {content: ""}
    
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleContentChange = (event) => {
    this.setState({content: event.target.value});
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let content = this.state.content.trim();
    if(!content) {
      return;
    }

    this.props.onMessageSubmit({content: content});
    this.setState({content: ""});
  }
  render() {
    return(
      <div>
        <form className="message" onSubmit={this.handleSubmit}>
          <input type="text" name="content" placeholder="Chat here ..."
            value={this.state.content} onChange={this.handleContentChange}/>
          <input type="submit" value="Send" />
        </form>
      </div>
    );
  }
}

export default Messages

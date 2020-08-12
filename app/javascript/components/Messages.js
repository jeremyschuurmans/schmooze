import React from "react"
import actioncable from "actioncable"

class Messages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.handleMessageSubmit = this.handleMessageSubmit.bind(this)
  }

  componentDidMount() {
    this.fetchMessages();
    this.cable = actioncable.createConsumer('ws://localhost:3000/cable');
    this.setSubscription();
  }

  setSubscription = () => {
    this.cable.subscriptions.create({
      channel: `MessageChannel`,
      id: this.props.topicId
    }, {
      connected: () => {
        console.log("connected!")
      },
      disconnected: () => { },
      received: data => { this.setState({messages: [...this.state.messages, data]}) }
    })
  }

  fetchMessages = () => {
    const url = "/messages"
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong with the network response.");
        }
      })
      .then(response => this.setState(() => { return { messages: response } }));
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
      .then(response => this.setState({ messages: response }))
  }

  render() {
    // console.log(this.props)
    return (
      <>
        <MessageList messages={this.state.messages} />
        <MessageForm onMessageSubmit={this.handleMessageSubmit} />
      </>
    );
  }
}

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const messages = this.props.messages.map((message) => {
      return (
        <div className={message.id % 2 === 0 ? 'self-start w-3/4 my-2' : 'self-end w-3/4 my-2'} key={message.id}>
          <div className="p-4 text-sm bg-white rounded-t-lg rounded-r-lg shadow">
            {message.content}
          </div>
        </div>
        // <li key={message.id}>{message.content}</li>
      )
    });
    return (
      <div className="self-center flex-1 w-full max-w-xl">
        <div className="chat-data relative flex flex-col px-3 py-1 m-auto">
          {messages}
        </div>
      </div>
      // <div className="chat-data">{messages}</div>
    );
  }
}

class MessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { content: "" }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleContentChange = (event) => {
    this.setState({ content: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let content = this.state.content.trim();
    if (!content) {
      return;
    }

    this.props.onMessageSubmit({ content: content });
    this.setState({ content: "" });
  }
  render() {
    return (
      // <div>
      //   <form className="message" onSubmit={this.handleSubmit}>
      //     <input type="text" name="content" placeholder="Chat here ..."
      //       value={this.state.content} onChange={this.handleContentChange} />
      //     <input type="submit" value="Send" />
      //   </form>
      // </div>

      <form
        className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400"
        onSubmit={this.handleSubmit}>
        <div className="w-full">
          <span className="absolute inset-y-0 right-0 flex items-center pr-6">
            <button type="submit" className="p-1 focus:outline-none focus:shadow-none hover:text-blue-500">
              <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24">
                <path fillRule="nonzero"
                  d="M6.43800037,12.0002892 L6.13580063,11.9537056 C5.24777712,11.8168182 4.5354688,11.1477159 4.34335422,10.2699825 L2.98281085,4.05392998 C2.89811796,3.66698496 2.94471512,3.2628533 3.11524595,2.90533607 C3.53909521,2.01673772 4.60304421,1.63998415 5.49164255,2.06383341 L22.9496381,10.3910586 C23.3182476,10.5668802 23.6153089,10.8639388 23.7911339,11.2325467 C24.2149912,12.1211412 23.8382472,13.1850936 22.9496527,13.6089509 L5.49168111,21.9363579 C5.13415437,22.1068972 4.73000953,22.1534955 4.34305349,22.0687957 C3.38131558,21.8582835 2.77232686,20.907987 2.9828391,19.946249 L4.34336621,13.7305987 C4.53547362,12.8529444 5.24768451,12.1838819 6.1356181,12.0469283 L6.43800037,12.0002892 Z M5.03153725,4.06023585 L6.29710294,9.84235424 C6.31247211,9.91257291 6.36945677,9.96610109 6.44049865,9.97705209 L11.8982869,10.8183616 C12.5509191,10.9189638 12.9984278,11.5295809 12.8978255,12.182213 C12.818361,12.6977198 12.4138909,13.1022256 11.8983911,13.1817356 L6.44049037,14.0235549 C6.36945568,14.0345112 6.31247881,14.0880362 6.29711022,14.1582485 L5.03153725,19.9399547 L21.6772443,12.0000105 L5.03153725,4.06023585 Z" />
              </svg>
            </button>
          </span>
          <input
            type="text"
            value={this.state.content}
            className="w-full py-2 pl-10 text-sm bg-white border border-transparent appearance-none rounded-tg placeholder-gray-800 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
            style={{ borderRadius: '25px' }}
            placeholder="Message..."
            autoComplete="off"
            onChange={this.handleContentChange}
          />
        </div>
      </form>
    );
  }
}

export default Messages

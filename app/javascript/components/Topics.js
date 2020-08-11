import React from "react"
import { Link } from "react-router-dom"
import Modal from "react-modal"

class Topics extends React.Component {
  constructor(props) {
    super(props);
    this.state = { topics: [] };
    this.handleTopicSubmit = this.handleTopicSubmit.bind(this)
  }

  componentDidMount() {
    this.fetchTopics();
  }

  fetchTopics = () => {
    const url = "/topics"
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Something went wrong with the network response.");
        }
      })
      .then(response => this.setState(() => { return { topics: response } }));
  }

  handleTopicSubmit = (content) => {
    // event.preventDefault();
    const url = "/topics";
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
      .then(response => this.setState({ topics: response }))
  }

  render() {
    // console.log(this.props)
    return (
      <>
        <TopicList topics={this.state.topics} />
        <TopicForm onTopicSubmit={this.handleTopicSubmit} />
      </>
    );
  }
}

class TopicList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const topics = this.props.topics.map((topic) => {
      return (
        <li className="flex flex-no-wrap items-center pr-3 text-black rounded-lg cursor-pointer mt-200 py-65 hover:bg-gray-200"
          style={{ paddingTop: "0.65rem", paddingBottom: "0.65rem" }} key={topic.id}>
          <div className="flex justify-between w-full focus:outline-none">
            <div className="flex justify-between w-full">
              <ul className="items-center flex-1 min-w-0">
                <li className="flex justify-center mb-1">
                  <h2 className="text-md font-semibold text-black">
                    <Link to={"/topics/" + topic.id}>{"# " + topic.name}</Link>
                  </h2>
                </li>
              </ul>
            </div>
          </div>
        </li>
      )
    });
    return (
      <div
        className="relative mt-2 mb-4 overflow-x-hidden overflow-y-auto scrolling-touch lg:max-h-sm scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray">
        <ul className="flex flex-col inline-block w-full h-screen px-2 select-none">
          {topics}
        </ul>
      </div>
    );
  }
}

class TopicForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" }
    this.state = { modalIsOpen: false }

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // Modal.setAppElement(document.getElementById('root'));

  handleNameChange = (event) => {
    this.setState({ name: event.target.value });
  }

  openModal = () => {
    this.setState({ modalIsOpen: true })
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let name = this.state.name.trim();
    if (!name) {
      return;
    }

    this.props.onTopicSubmit({ name: name });
    this.setState({ name: "" });
    this.setState({ modalIsOpen: false })
  }

  render() {
    return (
      <div>
        <div className="fixed absolute bottom-0 right-0 z-40 mb-6 mr-4">
          <button
            onClick={() => this.openModal()}
            className="flex items-center justify-center w-12 h-12 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full focus:outline-none flex-no-shrink">
            <svg className="w-6 h-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 32 32">
              <path fillRule="nonzero"
                d="M31 12h-11v-11c0-0.552-0.448-1-1-1h-6c-0.552 0-1 0.448-1 1v11h-11c-0.552 0-1 0.448-1 1v6c0 0.552 0.448 1 1 1h11v11c0 0.552 0.448 1 1 1h6c0.552 0 1-0.448 1-1v-11h11c0.552 0 1-0.448 1-1v-6c0-0.552-0.448-1-1-1 Z" />
            </svg>
          </button>
        </div>
        <Modal
          isOpen={this.state.modalIsOpen}
          style={customStyles}
          contentLabel="Add a channel"
        >
          <form className="w-full max-w-sm" onSubmit={this.handleSubmit}>
            <div className="font-bold text-xl mb-2 text-center">Create a channel</div>
            <div className="flex items-center border-b border-b-2 border-teal-500 py-2">
              <input
                type="text"
                value={this.state.name}
                placeholder="e.g. Ruby on Rails"
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight"
                onChange={this.handleNameChange}
              />
              <button className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Submit</button>
              <button onClick={this.closeModal} className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded" type="button">
                Cancel
            </button>
            </div>
          </form>
        </Modal>
      </div>
    );
  }
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

export default Topics
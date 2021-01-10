import React, { Component } from "react";
import { withOktaAuth } from "@okta/okta-react";
import ToDoList from "../Components/ToDoList";
import Header from "../Components/Header";

export default withOktaAuth(
  class Home extends Component {
    constructor(props, context) {
      super(props, context);

      this.state = {
        list: undefined,
        loadingList: false,
      };

      this.markItemAsComplete = this.markItemAsComplete.bind();
    }

    componentDidMount = () => {
      this.getCurrentItems();
    };

    componentDidUpdate = (prevProps, prevState, snapshot) => {
      this.getCurrentItems();
    };

    getCurrentItems() {
      if (
        this.props.authState.isAuthenticated &&
        !this.state.list &&
        !this.state.loadingList
      ) {
        this.setState({
          loadingList: true,
        });

        var itemsUrl = process.env.REACT_APP_SERVER_BASE_URL + "/todolist";

        fetch(itemsUrl, {
          method: "get",
          headers: new Headers({
            Authorization: "bearer " + this.props.authState.accessToken.value,
          }),
        })
          .then((res) => res.json())
          .then(
            (result) => {
              this.setState({ list: result, loadingList: false });
            },
            (error) => {
              console.log(error);
              this.setState({ loadingList: false });
            }
          );
      }
    }

    markItemAsComplete = (item) => {
      var itemsUrl = process.env.REACT_APP_SERVER_BASE_URL + "/todolist";

      var data = {
        id: item.id
      };

      fetch(itemsUrl, {
        method: "post",
        headers: new Headers({
          Authorization: "bearer " + this.props.authState.accessToken.value,
          "Content-Type": "application/json",
        }),
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.success) {
              var list = this.state.list.filter(function (i) {
                return i.id !== item.id;
              });

              this.setState({ list: list });
            }
          },
          (error) => {
            console.log(error);
          }
        );
    };

    render() {
      var body = this.props.authState.isAuthenticated ? (
        <ToDoList
          authState={this.props.authState}
          list={this.state.list}
          onCompleteItem={this.markItemAsComplete}
        ></ToDoList>
      ) : (
        <div>
          <div className="row">
            <div className="text-center col-lg-12">
              <h3>Yet Another ToDo List! </h3>
              <br></br>
              <h5>
                A React Demo Using{" "}
                <a target="_blank" rel="noreferrer" href="https://nestjs.com/">
                  NestJS
                </a>
                <br />
                Secured With{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.okta.com/"
                >
                  Okta{" "}
                </a>
              </h5>
            </div>
          </div>
        </div>
      );

      return (
        <div className="container">
          <div className="row" style={{ minHeight: "500px" }}>
            <div className="col-lg-12">
              <Header
                authState={this.props.authState}
                oktaAuth={this.props.oktaAuth}
              ></Header>
              {body}
            </div>
          </div>
          <footer className="text-muted text-center">
            <div className="container">
              <p>
                A Small demo using{" "}
                <a target="_blank" rel="noreferrer" href="https://nestjs.com/">
                  Nest JS{" "}
                </a>{" "}
                Secured by{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.okta.com/"
                >
                  Okta{" "}
                </a>
              </p>
              <p>
                By <a href="https://profile.fishbowlllc.com">Nik Fisher</a>
              </p>
            </div>
          </footer>
        </div>
      );
    }
  }
);

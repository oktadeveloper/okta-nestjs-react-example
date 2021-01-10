import React from "react";
import { useOktaAuth } from "@okta/okta-react";

const Header = () => {
  const { oktaAuth, authState } = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  const button = authState.isAuthenticated ? (
    <button
      className="btn btn-secondary"
      onClick={() => {
        oktaAuth.signOut("/");
      }}
    >
      Logout
    </button>
  ) : (
    <button
      className="btn btn-secondary"
      onClick={() => {
        oktaAuth.signInWithRedirect();
      }}
    >
      Login
    </button>
  );

  return (
    <div className="navbar" bg="light" expand="lg">
      <div className="navbar" href="/">
        NestJS To Do List
      </div>
      <div className="navbar" aria-controls="basic-navbar-nav"></div>
      <div className="navbar" id="basic-navbar-nav">
        <div className="navbar mr-auto"></div>
        <form className="inline">{button}</form>
      </div>
    </div>
  );
};
export default Header;

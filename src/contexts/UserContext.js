import React, { createContext, Component } from 'react';

export const UserContext = createContext();

class UserContextProvider extends Component {
    state = {
        userHandle: "",
        userPassword: "",
        userId: "",
        currentSessionKey: ""
    };

    storeUserHandleInContext = (handle) => {
        this.setState({userHandle: handle})
    };

    storeUserPasswordInContext = (password) => {
        this.setState({userPassword: password})
    };

    storeUserIdInContext = (id) => {
        this.setState({userId: id})
    };

    storeCurrentSessionKeyInContext = (sessionKey) => {
        this.setState({currentSessionKey: sessionKey})
    };

    render() {
        return (
            <UserContext.Provider value={{ 
                ...this.state,
                storeUserHandleInContext: this.storeUserHandleInContext,
                storeUserPasswordInContext: this.storeUserPasswordInContext,
                storeUserIdInContext: this.storeUserIdInContext,
                storeCurrentSessionKeyInContext: this.storeCurrentSessionKeyInContext,
                }}>{this.props.children}</UserContext.Provider>
        )
    }
}

export default UserContextProvider;
import React, { createContext, Component } from 'react';

export const UserContext = createContext();

class UserContextProvider extends Component {
    state = {
        userHandle: "",
        userPassword: "",
        userId: ""
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

    render() {
        return (
            <UserContext.Provider value={{ 
                ...this.state,
                storeUserHandleInContext: this.storeUserHandleInContext,
                storeUserPasswordInContext: this.storeUserPasswordInContext,
                storeUserIdInContext: this.storeUserIdInContext}}>{this.props.children}</UserContext.Provider>
        )
    }
}

export default UserContextProvider;
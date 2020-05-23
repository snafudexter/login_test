import React from 'react';

const getUserData = (Component) => {

    let login = localStorage.getItem('login')

    return class extends React.Component{

        render()
        {
            return <Component login={login} {...this.props} />
        }

    }
}

export default getUserData;
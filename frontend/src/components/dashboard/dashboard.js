import React from 'react';
import { withRouter } from 'react-router-dom'
import CategoryIndexContainer from '../category/category_index_container';

class Dashboard extends React.Component {
    
  

    render() {
        
        return (
          <div className="dashboard">
            <h1 className="dash-header" />
            <CategoryIndexContainer />
          </div>
        );
    }
}

export default withRouter(Dashboard);
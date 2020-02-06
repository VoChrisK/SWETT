import React from 'react';
import { withRouter } from 'react-router-dom'
import SidebarContainer from '../sidebar/sidebar_container';
import QuestionIndexContainer from '../question/question_index_container';
import GoalIndexContainer from '../goal/goal_index_container';


class CrackingTheCoding extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="leetcode">
                <SidebarContainer />
                <QuestionIndexContainer />
                <GoalIndexContainer categoryId={this.props.category._id} />
            </div>
        );
    }
}

export default withRouter(CrackingTheCoding);
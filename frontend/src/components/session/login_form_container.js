import React from 'react';
import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import LoginForm from './login_form';

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        formType: 'login'
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(login(user)),
        otherForm: (
            <button className="auth-button" onClick={() => dispatch(openModal('signup'))}>
                Signup
            </button>
        ),
        closeModal: () => dispatch(closeModal())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginForm);
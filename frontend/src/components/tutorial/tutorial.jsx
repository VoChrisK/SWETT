import React, { useState } from 'react';
import { connect } from 'react-redux';
import { hideTutorial } from '../../actions/tutorial_actions';
const pluralize = require("pluralize");

const Tutorial = ({ hideTutorial, category }) => {
    const stepOne = <div className="tutorial-description big">
        <h1 className="tutorial-message one">Welcome to the SWEETT tutorial! This tutorial will guide you on how to use this app!</h1>
        <h1 className="tutorial-message one">Press anywhere on the screen to continue.</h1>
    </div>

    const stepTwo = <div className="tutorial-description two">
        <img className="circle" src={require("./../../assets/images/circle.png")} />
        <h1 className="tutorial-message">This button allows you to add a task! You will be prompted to fill out the name of the task and which section it belongs to.</h1>
    </div>

    const stepThree = <div className="tutorial-description three">
        <h1 className="tutorial-message">{`Let's go ahead and click on this button to create a(n) ${pluralize.singular(category.taskName.toLowerCase())} for ${category.title}. Once you are done, the tutorial will resume.`}</h1>
    </div>

    const stepFour = <div className="tutorial-description four">
        <img className="circle" src={require("./../../assets/images/circle.png")} />
        <h1 className="tutorial-message">Great! Once you add a task, you are able to record its time. This button will start a recording session for this task. You are able to pause and stop the timer.</h1>
    </div>

    const stepFive = <div className="tutorial-description five">
        <h1 className="tutorial-message">Now you try it out! Go ahead and record a task you just created (or any task really). Once you're done recording the task, the tutorial will resume.</h1>
    </div>

    const stepSix = <div className="tutorial-description six">
        <img className="circle" src={require("./../../assets/images/circle.png")} />
        <h1 className="tutorial-message">Moving on! This button expands a task and reveals all of its attempts. You also have more options to edit its title, delete it, and write and save notes!</h1>
    </div>

    const stepSeven = <div className="tutorial-description seven">
        <img className="circle" src={require("./../../assets/images/circle.png")} />
        <h1 className="tutorial-message">This button allows you to add a goal. You will be prompted to add its description, amount to complete it, and choose to track its time.</h1>
    </div>

    const stepEight = <div className="tutorial-description eight">
        <h1 className="tutorial-message">Now click on the button to add a goal. Specify the amount and whether to track its time. When you are done adding the goal, the tutorial will resume.</h1>
    </div>

    const stepNine = <div className="tutorial-description nine">
        <img className="circle" src={require("./../../assets/images/circle.png")} />
        <h1 className="tutorial-message">You are able to increase or decrease the amount of attempts needed to finish a goal using these two buttons.</h1>
    </div>

    const stepTen = <div className="tutorial-description ten">
        <img className="circle" src={require("./../../assets/images/circle.png")} />
        <h1 className="tutorial-message">This button is to modify the time limit for each task. Goals that track time will rely on this time limit.</h1>
    </div>

    const stepEleven = <div className="tutorial-description eleven">
        <h1 className="tutorial-message">Go ahead and click on it to change the time limit. If you chose to track the time of the goal you created earlier, then the minutes to the left will change. Once you're done, the tutorial will resume.</h1>
    </div>

    const stepTwelve = <div className="tutorial-description twelve">
        <h1 className="tutorial-message">You can navigate to any one of your categories using the sidebar to the left.</h1>
    </div>

    const stepThirteen = <div className="tutorial-description big thirteen">
        <h1 className="tutorial-message one">That's it! You're all set to use the app!</h1>
    </div>

    const [counter, setCounter] = useState(0);
    const steps = [stepOne, stepTwo, stepThree, stepFour, stepFive, stepSix, stepSeven, stepEight, stepNine, stepTen, stepEleven, stepTwelve, stepThirteen];

    const increment = () => {
        if(counter >= steps.length - 1) {
            hideTutorial();
        } else if([2,4,7,10].includes(counter)) {
            document.getElementsByClassName("tutorial-background")[0].classList.add("hide");
            setCounter(counter + 1);
        }
        else {
            updateCircle(counter);
            setCounter(counter + 1);
        }
    };

    const decrement = (event) => {
        event.stopPropagation();
        if(counter > 0) {
            updateCircle(counter - 1);
            setCounter(counter - 1);
        }
    }

    const updateCircle = (count) => {
        let filledCircle = document.getElementsByClassName("fas fa-circle")[0];
        let nextCircle = document.getElementsByClassName("far fa-circle")[count];
        filledCircle.classList.remove("fas");
        filledCircle.classList.remove("fa-circle");
        filledCircle.classList.add("far");
        filledCircle.classList.add("fa-circle");
        nextCircle.classList.remove("far");
        nextCircle.classList.remove("fa-circle");
        nextCircle.classList.add("fas");
        nextCircle.classList.add("fa-circle");
    }

    return (
        <div className="tutorial-background" onClick={increment}>
            {steps[counter]}
            <div className="step-circles">
                {counter > 0 ? <i className="fas fa-arrow-circle-left tooltip" onClick={decrement}>
                    <span className="tooltiptext">Go back a step</span>
                </i> : null}
                <i className="fas fa-circle"></i>
                <i className="far fa-circle"></i>
                <i className="far fa-circle"></i>
                <i className="far fa-circle"></i>
                <i className="far fa-circle"></i>
                <i className="far fa-circle"></i>
                <i className="far fa-circle"></i>
                <i className="far fa-circle"></i>
                <i className="far fa-circle"></i>
                <i className="far fa-circle"></i>
                <i className="far fa-circle"></i>
                <i className="far fa-circle"></i>
                <i className="far fa-circle"></i>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        hideTutorial: () => dispatch(hideTutorial())
    };
}

export default connect(null, mapDispatchToProps)(Tutorial);
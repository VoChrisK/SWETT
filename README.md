## SWEETT

S.W.E.E.T.T. (**S**oft**w**are **E**ngineering **E**mployment **T**ime **T**racker) is a _time tracking_ and _goal setting_ app specifically tailored towards software engineering job seekers. 

[Live Site](https://sweett-gs.herokuapp.com/)

![sweett](https://github.com/VoChrisK/personal-website/blob/master/src/images/personal-website-gif-2.gif)

## Background and Overview

**It is difficult to strike a balance between various tasks and figure out what category you might lack in during the job search.** There are so many important categories you must put some time into, yet so little time to put your heart and soul to all of them. Categories such as:
* data structures
* algorithms

and other self-studying related materials are crucial for a successful job search. This app addresses and mitigates this struggle by:

* recording the time for all the tasks you have done for each category. 
* allowing users to set goals for each category.

The app will help job seekers visualize and understand what areas they need to improve and spend more time on. It will also promote organization and time management during the job search. Ultimately, it will provide a better job search experience for those who plan to enter the world of software development.

## Technologies Used
* MongoDB Atlas
* Mongoose 5.8.9
* Express.js 4.17.1
* React 16.12.0
* Redux 4.0.5
* Node.js 8.10.0
* Heroku

## Functionality and MVP

* Upon signing up, users will start with threes default categories that cannot be modified and deleted: Leetcode, Cracking the Coding Interview, and Languages/Technologies. Categories that were not completed the day prior will be highlighted to alert users that they need to spend more time on them.

* Users can add, edit, or delete a new Leetcode question. Each question can have multiple attempts that are deletable. Users can time themselves to answer a question and save it as an attempt. They can also set goals that reset daily and can contribute to the total time accumulated.

* Users can add, edit, or delete problems in the book _Cracking the Coding Interview_. Like the Leetcode category, they can time themselves to answer a question and save it as an attempt. They can also set goals that counts towards the time to complete this category per day.

* Users can create, modify, and delete custom categories. Not only can they set the name of the category and the task associated with it, they can set goals and time limit for them. They can create up to nine custom categories, excluding the default three.

## Technicalities and Challenges

Sweett's core application is the ability to track time for each task and set goals for each category. Upon logging in/signing up, users are greeted with a dashboard containing two default categories: Leetcode and _Cracking the Coding Interview_. Users will have their own set of categories independent of others, including default ones. Users can create, modify, and delete tasks and goals for each category, and time themselves and record them as attempts/reports. Users can create more categories as needed and can visit any one of them at anytime. 

Each component and collection are designed with modularity and reusability in mind. Storing categories, tasks, goals, and attempts/reports are handled using MongoDB for the NoSQL database, and their CRUD operations are handled using Express.js for the router and Node.js for the runtime environment. The app's overall visual presentation and user experience are handled using React and Redux. Calculating differences in dates and daily resets are handled by manipulating the native JavaScript Date object.

### Goals Setting

Handling goals is an important feature of the app. Sometimes, users will add goals that do not count towards the expected time. For instance, users can add a goal to solve X number of Leetcode questions per day, which counts towards the expected time. However, users can also add a goal to solve Y number of _easy_ Leetcode questions per day, which is an enhancement of the previous goal and therefore do not count. In addition to setting the name of the goal and amount needed to complete it, we included the option to choose whether the goal counts toward the total time or not. If it does, it will recalculate the expected time accordingly. Completions towards goals are tracked through a progress parameter. Each category has their own separate progress parameters displayed in percentage. Here are some code snippets to calculate each goal's progress and the total progress of all goals per category:

```js
export const calculateProgress = (goal) => {
    return parseFloat(((goal.attempted / goal.expected) * 100).toFixed(2));
}
```

```js
export const calculateTotalProgress = (goals) => {
    let attempted = 0;
    let expected = 0;
    for(let i = 0; i < goals.length; i++) {
        attempted += goals[i].attempted;
        expected += goals[i].expected;
    }

    return parseFloat(((attempted / expected) * 100).toFixed(2));
}

```

### Time Tracker

Since the app's main focus is time tracking, there are two sections for time: expected time and actual time. Expected time is the time you need to complete a category while actual time is the time you currently accumulated. Calculating the expected and actual time was a challenge. We originally planned to have users change the time limit for each task. However, calculating the expected time by adding the total time of tasks based on goals was very variable. Instead, we decided to have users change the time limit per task for all tasks. This made it easier to calculate the actual time and dynamically change it based on the goals. We calculate the expected time based on a combination of goals and attempts/reports. Each point towards completing a goal will count as the full duration of a task. If there are partially completed goals, the app takes _daily_ attempts/reports to account. Here are some code snippets to calculate the expected and actual time:

```js
export const calculateExpectedTime = (limit, goals) => {
    let totalQuestions = 0;
    for (let i = 0; i < goals.length; i++) {
        if (goals[i].addToTotal) totalQuestions += goals[i].expected;
    }

    return Math.floor((totalQuestions * limit));
};
```

```js
export const calculateActualTime = (limit, attempts, goals) => {
    let totalTime = 0;
    let totalSeconds = 0;
    let totalAttemptedGoals = goals.reduce((acc, goal) => {
        if (goal.addToTotal) {
            return acc + goal.attempted;
        } else {
            return acc
        }
    }, 0);
    let totalExpectedGoals = goals.reduce((acc, goal) => {
        if(goal.addToTotal) {
            return acc + goal.expected;
        } else {
            return acc
        }
    }, 0);

    totalTime += limit * totalAttemptedGoals;
    
    if (totalAttemptedGoals !== totalExpectedGoals) {
        for (let i = 0; i < attempts.length; i++) {
            if(calculateDays(new Date(attempts[i].date), Date.now()) === 1) {
                totalSeconds += attempts[i].time;
            }
        }
    }

    return Math.floor(totalTime + (totalSeconds / 60));
};
```



## Wireframes

Wireframes were created using Adobe XD.

**The app's dashboard.**

![alt text](https://i.imgur.com/tKDa8kR.png)

This page shows all of the current user's categories and their time and progression for each one. After a day has elapsed, the time and progression for tasks and goals will add on to the category's total time and progression. If a category has <50% progression or time completed, then it will be highlighted, indicating that the user did not put enough time for it the day prior. Clicking on a category box will redirect the user to the respective category show page.







**The app's category show page, particularly the Leetcode category.**

![alt text](https://i.imgur.com/K8MJlMP.png)

Each question/task will have a button to record an entry, as well as to pause, resume, and stop. Each question/task can also be categorized based on section. In this case, questions are categorized by difficulty. Aside from the questions/tasks container, there are two sidebars: one to navigate to other categories and another to handle goals. This interface is used for all categories' show pages.

## Team Members

* [Chris Vo](https://github.com/vochrisk) - Team Lead
* [Han Kim](https://github.com/kimhandole) - Frontend-focused, flex
* [Brian Tran](https://github.com/btran1994) - Frontend-focused, flex
* [Herman Xie](https://github.com/hxie3) - Backend-focused, flex

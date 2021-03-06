export const calculateExpectedTime = (limit, goals) => {
    let totalQuestions = 0;
    for (let i = 0; i < goals.length; i++) {
        if (goals[i].addToTotal) totalQuestions += goals[i].expected;
    }

    return Math.floor((totalQuestions * limit));
};

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
export const calculateProgress = (goal) => {
    return parseFloat(((goal.attempted / goal.expected) * 100).toFixed(2));
}

export const calculateTotalProgress = (goals) => {
    let attempted = 0;
    let expected = 0;
    for(let i = 0; i < goals.length; i++) {
        attempted += goals[i].attempted;
        expected += goals[i].expected;
    }

    return parseFloat(((attempted / expected) * 100).toFixed(2));
}

export const calculateDays = (date1, date2) => {
    let differenceInTime = date2 - date1.getTime();
    return Math.floor(differenceInTime / (1000 * 3600 * 24)) + 1;
}
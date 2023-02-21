// let problems = [
//     {
//         "id":1,
//         "name":"Straight line",
//         "desc":"Draw a simple straight line.",
//         "difficulty":"easy"
//     },
//     {
//         "id":2,
//         "name":"2 straight lines",
//         "desc":"Draw 2 straight lines.",
//         "difficulty":"medium"
//     },
//     {
//         "id":3,
//         "name":"Sine curve",
//         "desc":"Draw a sine curve.",
//         "difficulty":"medium"
//     },
//     {
//         "id":4,
//         "name":"Bar chart",
//         "desc":"Draw a bar chart represent GDP growth.",
//         "difficulty":"hard"},
//     {
//         "id":5,
//         "name":"3D diagram",
//         "desc":"Draw a 3D diagram of a ball.",
//         "difficulty":"super"
//     }
// ];


//import { Problem } from "../../client/src/app/models/problem.model";

const ProblemModel = require("../models/problemModel");


//get all problems
const getProblems = function() {
    // return new Promise((resolve) => {
    //     resolve(problems);
    // })
    return new Promise((resolve, reject) => {
        ProblemModel.find({}, (err, problems) => {
            if (err) {
                reject(err);
            } else {
                resolve(problems);
            }
        });
    });
};

//get one problem
const getProblem = function(idNumber) {
    // return new Promise((resolve => {
    //     resolve(problems.find(problem => problem.id === id));
    // }));
    return new Promise((resolve, reject) => {
        ProblemModel.findOne({id: idNumber}, (err, problem) => {
            if (err){
                reject(err);
            } else {
                resolve(problem);
            }
        });
    });
};

//add a problem
const addProblem = function (newProblem) {
    // return new Promise((resolve, reject) => {
    //     if (problems.find(problem => problem.name === newProblem.name)){
    //         reject('problem already exists.');
    //     } else {
    //         newProblem.id = problem.length + 1;
    //         problems.push(newProblem);
    //         resolve(newProblem);
    //     }
    // });
    return new Promise((resolve, reject) => {
    ProblemModel.findOne({name: newProblem.name}, (err, data) => {
        if (data) {
            reject('Problem already exists');
        } else {
            ProblemModel.count({}, (err, count) => {
                newProblem.id = count + 1;
                const mongoProblem = new ProblemModel(newProblem);
                mongoProblem.save();
                resolve(mongoProblem);
            });
        }
    });
});

};
module.exports = {
    getProblems,
    getProblem,
    addProblem
};
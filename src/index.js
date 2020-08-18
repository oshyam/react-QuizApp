import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./assets/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class QuizBee extends Component{
  //adding state for getting questionBank
  state = {
questionBank:[],
score:0,
responses:0
  };
  //getQuestion
getQuestions = () =>{
  quizService().then(question =>{
    this.setState({
      questionBank:question
    });
  });
};

//invoking DidMount Function
computeAnswer = (answer, correctAnswer) => {
  if(answer === correctAnswer){
    this.setState({
      score: this.state.score + 1
    });
  };
  //for all track result
  this.setState({
    responses:this.state.responses < 5 ? this.state.responses + 1 : 5
  });
};
//play again 
playAgain = ()=>{
this.getQuestions();
this.setState({
  score:0,
  responses:0
})
}
componentDidMount(){
  this.getQuestions();
}
//render template to render the components
  render(){
    return (
      <div className="container">
      <div className="title">QuizApp</div>
        {this.state.questionBank.length >  0 &&
          this.state.responses < 5 && 
          this.state.questionBank.map(
        ({question,answers,correct,questionId}) => ( 

          <QuestionBox 
          question = {question}
          options = {answers}
          key={questionId}
          selected={answer => this.computeAnswer(answer, correct)}
          />

        )
      )}

      
      {this.state.responses ===5 ? (<Result score={this.state.score} playAgain={this.playAgain}/>):null}
      </div>
    );
  }
}

ReactDOM.render(<QuizBee/>,document.getElementById("root"));
const App = React.createClass({
  getInitialState(){
    return {
      movies:[]
    }
  },

  addMovie(newMovie){
    const {movies} = this.state;
    this.setState({
      movies:[...movies,newMovie]
    })
  },

  render(){
    const {movies} =this.state;
    console.log("movies",movies)
    return (
      <div>
      <h1>Movie Rating App</h1>
      <MovieForm addNewMovie = {this.addMovie}/>
      <MovieTable displayMovie = {movies}/>
      </div>
    )
  }
})

//Movie Form Component

const MovieForm = React.createClass({

  submitForm(event){
    event.preventDefault();
    let {name,url} = this.refs;
    let movie ={
      name:name.value,
      url:url.value,
      id:uuid(),
      score:0
    }
   this.props.addNewMovie(movie);
  },

  render(){

    return (
      <form onSubmit ={this.submitForm}>
        <div class="form-group">
          <input type="text" className="form-control" id="moviename"  placeholder="Enter Movie Name" ref="name"/>
        </div>
        <br/>

        <div class="form-group">
          <input type="text" className="form-control" id="movieurl" placeholder="Enter Movie Url" ref ="url"/>
        </div>
        <br/>

        <button className ="btn btn-primary">Add Movie</button>
      </form>
      )
  }
})

// Movie Table Component

const MovieTable = React.createClass({

  getInitialState(){
    return {
      score:0
    }
  },

  sortScore(){
     const {displayMovie} = this.props;
     console.log("inside Sort Score",displayMovie);
     keysSorted = Object.keys(displayMovie).sort(function(a,b){return displayMovie[a]-displayMovie[b]})
      alert(keysSorted); 
  },

  upVote(id){
    console.log(id);
    let {score} = this.state;
    this.setState({score:score+1});
    this.sortScore();
  },

  downVote(id){
     let {score} = this.state;
     if(score>0){
      this.setState({score:score-1});
      this.sortScore();
     }
  },

  render(){
    const {displayMovie} = this.props;
    return (
    <table className="table">
      <thead>
        <tr>
          <th>Movie Image</th>
          <th>Movie Name</th>
          <th>Score</th>
          <th>Upvote/DownVote</th>
      </tr>
      </thead>
      <tbody>
      {displayMovie.map(movie =>{
       return ( 
        <tr key={movie.id}>
          <td>{movie.name}</td>
          <td><img src={movie.url} width="150px"/></td>
          <td>{this.state.score}</td>
          <td><button onClick={()=>this.upVote(movie.id)}className="btn btn-sm btn-success glyphicon glyphicon-thumbs-up"></button>
              <button onClick={()=>this.downVote(movie.id)}className="btn btn-sm btn-warning glyphicon glyphicon-thumbs-down"></button>
          </td>
        </tr>
      )
      })}
      
</tbody> 
    </table>
    )
  }
})
  ReactDOM.render(<App/>,document.getElementById('root'));
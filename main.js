const App = React.createClass({
  getInitialState(){
    return {
      movies:[],
    }
  },

  addMovie(newMovie){
    const {movies} = this.state;
    this.setState({
      movies:[...movies,newMovie]
    })
  },
  
  sortScore(){
     const {movies} = this.state;
     console.log("inside Sort Score",movies);
     sortedScore = movies.sort((a,b)=>
       {
        return (b.score-a.score);
       })
    },

  upScore(id){
  console.log("movie_id",id)
  let{movies}=this.state;
  console.log(movies);
  movies.map(movie=> {
    if(movie.id === id) {
      console.log("id equal")
      movie.score = movie.score+1;
    }
  })
  this.setState({movies:movies});
  this.sortScore();
  },
  
  downScore(id){
  console.log("movie_id",id)
  let{movies}=this.state;
  console.log(movies);
  movies.map(movie=> {
    if(movie.id === id && movie.score > 0) {
      console.log("id equal")
      movie.score = movie.score-1;
    }
  })
  this.setState({movies:movies});
  this.sortScore();
  },

  render(){
    const {movies} =this.state;
    console.log("movies",movies)
    return (
      <div>
      <h1>Movie Rating App</h1>
      <MovieForm addNewMovie = {this.addMovie}/>
      <MovieTable displayMovie = {movies} upScore={this.upScore} downScore={this.downScore} />
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
  render(){
    const {displayMovie,upScore,downScore} = this.props;
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
          <td>{movie.score}</td>
          <td><button onClick={upScore.bind(null,movie.id)}className="btn btn-sm btn-success glyphicon glyphicon-thumbs-up"></button>
              <button onClick={downScore.bind(null,movie.id)}className="btn btn-sm btn-warning glyphicon glyphicon-thumbs-down"></button>
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
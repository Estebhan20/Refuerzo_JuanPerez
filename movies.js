const { Router } = require('express');
const router = Router();
const fs = require('fs');
//Leer el archivo json

const moviesFile = fs.readFileSync('./movies.json', 'utf-8');
let movies =JSON.parse(moviesFile);


router.get('/', (req, res) =>{
    res.status(200).json("API REST CRUD POLIJIC")
    //res.json('API REST CRUD POLIJIC');
});

router.get("/movies", (req, res) =>{
    res.status(200).json(movies);
}); //Traer todas las películas

// Guardar una pelicula
router.post("/movies", (req, res) =>{
    const{title, director, year, duration, genre, poster} = req.body;
    if(!title || !director || !year || !duration || !genre || !poster) {

        res.status(401).json({error: "Todos los campos son obligatorios"});
    
    } else {

        const id = movies.lenght+1;
        let newMovie = {id, title, director, year, duration, genre, poster}
        
        movies.push(newMovie);
        // Crear en formato json registro json
        const json_movies = JSON.stringify(movies);
        // Escribir el archivo json
        fs.writeFileSync("./movies.json", json_movies, "utf-8");
        res.status(200).json(movies);

    }

}); // Fin guardar post

router.put("/movies/:id",(req,res)=>{
    const{title, director, year, duration, genre, poster} = req.body;
     const id =req.params.id;
     if(!title || !director || !year || !duration || !genre || !poster) {

        res
        .status(4001)
        .json({Error:"Todos los campos deben ser diligenciados y/o especificar el id"});
    } else {
        movies.filter((movies)=>{
         if(movies.id==id){
          movies.title=title;
          movies.director=director; 
          movies.year=year;
          movies.duration=duration;
          movies.genre=genre;
          movies.poster=poster;

          }//Fi si
       
         });
         const json_movies=JSON.stringify(movies);
         fs.writeFileSync("./movies.json",json_movies,"utf-8");
         res.status(200).json(movies);
    }// Fin si


})// Fin actualizar movies PUT 
// Borrar un dato

router.delete("/movies/:id",(req,res)=>{
const id= req.params.id;

    if(!id){
        res.status(500).json({Error:"Ingrese el id de la pelicula"});

    }else{// Si no falso
  const indexMovie = movies.findIndex((movie)=>movie.id==id);
  movies.splice(indexMovie,1);
  const json_movies = JSON.stringify(movies);
  fs.writeFileSync("./movies.json",json_movies,"utf-8");
  res.status(200).json(movies);

    }// Fin si 

}); // Fin borrar delete

module.exports = router;
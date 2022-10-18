import { AppBar, Box, Grid, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
// import { BrowserRouter as Link} from 'react-router-dom';



function Home () {
    const [data, setData] = useState([]);
    // console.log(data, 'data');
   const DataApi = () => axios
    .get("https://newsapi.org/v2/everything?domains=wsj.com&apiKey=e3a5e56da8524a9f9ece12716d8fa4de")
    .then((succes)=> {
        // console.log(succes, 'sucess');
        setData(succes.data.articles)
    })
    .catch((error)=> {
        console.log(error);
    })

    useEffect(() => {
        DataApi()
    },[])
    
   const navigate = useNavigate(); 
   const newsData = (value) => navigate("/detail", {
    state : {value},
})
// console.log(navigate);

    return (
       <>
       <Box>
       <AppBar sx={{backgroundColor : "brown", display : "flex", justifyContent : "center", textAlign : "center"}}>
        <Box >
      <Typography sx={{fontSize : 70 , fontFamily: "Rowdies, cursive", textShadow:" 4px 4px 1px gray"}}>NEWS API</Typography>   
      </Box>
       </AppBar>
       <br />
       <br />
       <Box sx={{marginTop : 7}}>
       <Carousel>
                {data.map(event => ( <Box> <img src={event.urlToImage}onClick={() => newsData(event)} width="100%" height="250vh" /> 
                <Typography onClick={() => newsData(event)} sx={{position : "absolute", top : 210, color : "white", backgroundColor : "black"}}> {event.title} </Typography> </Box> ) )}
       </Carousel>
       </Box>
     <Grid  container sx={{ display : "flex", justifyContent : "center"}}>
       {data.map((event, item) => 
       <Grid key={item} item md={3} sm={4} xs={12} sx={{cursor : "pointer",  margin : 1, display : "flex", justifyContent : "center"}} >
       <Card  onClick={() => newsData(event)} sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image={event.urlToImage}
      />
      <Box sx={{display : "flex", flexDirection : "column", justifyContent : "space-between"}}> 
     <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {event.title.slice(0, 10)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {event.description.slice(0, 20)}  
        </Typography>
      </CardContent>
      </Box>

      <CardActions>
        
        <Button style={{fontFamily: "Rowdies, cursive", color: "brown"}} onClick={() => newsData(event)} size="large">READ MORE!</Button>
      </CardActions>
    </Card>
    </Grid> )}
    </Grid>
       </Box>
       </>
    )   
   }
   
   export default Home
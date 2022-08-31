import { Typography, Box, makeStyles, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton, Tooltip } from "@material-ui/core"
import { orange } from '@material-ui/core/colors';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
const useStyles = makeStyles({
 stuListColor: {
  backgroundColor: orange[400],
  color: "white"
 },
 tableHeadCell: {
  color: "white",
  fontWeight: "bold",
  fontSize: 16
 },
})

const List = () => {
 const classes = useStyles();
 const [blogs, setblogs] = useState([]);

 useEffect(() => {
  async function getAllblog() {
   try {
    const blogs = await axios.get("http://localhost:3333/blogs")
    // console.log(blogs.data);
    setblogs(blogs.data);
   } catch (error) {
    console.log("Something is Wrong");
   }
  }
  getAllblog();
 }, [])

 const handleDelete = async id => {
  await axios.delete(`http://localhost:3333/blogs/${id}`);
  var newblog = blogs.filter((item) => {
   // console.log(item);
   return item.id !== id;
  })
  setblogs(newblog);
 }


 return (
  <>
   <Box textAlign="center" p={2} className={classes.stuListColor}>
    <Typography variant="h4">Blogs List</Typography>
   </Box>
   <TableContainer component={Paper}>
    {/* <Table> */}
{/*         
     <TableHead>
      <TableRow style={{ backgroundColor: "#616161" }}>
       <TableCell align="center" className={classes.tableHeadCell}>No</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Name</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Email</TableCell>
       <TableCell align="center" className={classes.tableHeadCell}>Action</TableCell>
      </TableRow>
     </TableHead> */}


     {/* <TableBody> */}
      {
       blogs.map((blog, i) => {
        return (
         <div key={i}>
          <TableCell align="center">{i + 1}</TableCell>
          <h2 align="center">{blog.title}</h2>
          <p align="center">{blog.details}</p>


          <TableCell align="center">

           <Tooltip title="View">
            <IconButton><Link to={`/view/${blog.id}`}><VisibilityIcon color="primary" /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Edit">
            <IconButton><Link to={`/edit/${blog.id}`}><EditIcon /></Link></IconButton>
           </Tooltip>
           <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(blog.id)}><DeleteIcon color="secondary" /></IconButton>
           </Tooltip>
          </TableCell>
         </div>
        )
       })
      }

     {/* </TableBody> */}
    {/* </Table> */}
   </TableContainer>
  </>
 )
}

export default List







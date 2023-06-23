import React from 'react'
import {
    Dialog,
    DialogBody,
    DialogHeader,
    DialogFooter,
    Button,
    List,
    ListItem,
    Typography,
} from '@material-tailwind/react'

import { db, storage } from '../config/firebase.config';
import { doc, deleteDoc, getDoc, updateDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { deleteObject, ref } from 'firebase/storage';
import { useStateValue } from '../context/StateProvider';

const RecipeDialog = (props) => {
  const [{user}] = useStateValue();
  const {open, handleOpen, recipe} = {...props};
  const navigate = useNavigate();
  const deleteRef = ref(storage, `images/${recipe.filename}`);

  const deleteRecipe = async () => {
    try {
      deleteDoc(doc(db, 'recipes', recipe.id))
      .then(()=>{
        deleteObject(deleteRef)
        .then(()=>{
          handleOpen();
          navigate('/home/profile', {replace: true});
        })
        .catch((error)=>{console.error(error);})
      })
      .catch((error)=>{console.error(error);})
    } catch (error) {
      console.error(error);
    }
  }

  const saveRecipe = async (uri) => {
    const uid = user?.uid;

    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const result = docSnap.data();
        let savedRecipes = result['savedRecipes'];
        if(!savedRecipes.includes(uri)){
          savedRecipes.push(uri);
          const recipeRef = doc(db, 'users', uid);
          try {
            updateDoc(recipeRef, {
              savedRecipes: savedRecipes
            })
            .then(handleOpen)
          } catch (error) {
            console.error(error);
          }
        }
        else{
          alert('Already saved');
          handleOpen();
        }
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Dialog open={open} handler={handleOpen} className='max-h-[calc(90vh-2rem)]'>
        <DialogHeader>{recipe.label}</DialogHeader>
        <DialogBody divider className='grid gap-2 lg:flex'>
          <div className='flex items-center w-full gap-2 py-2 rounded-md justify-evenly lg:flex-col bg-blue-gray-50 md:bg-transparent md:justify-start'>
            <img src={recipe.image} alt="meal" className='object-cover w-20 h-20 rounded-md md:w-fit md:h-fit' loading='lazy'/>
            <Typography variant='h5' className='text-accent'>{recipe.calories.toFixed(2)} calories</Typography>
          </div>
          <div className='grid w-full max-h-72 lg:max-h-96'>
            <Typography className='pl-6 text-xl font-bold uppercase text-accent'>Ingredients</Typography>
            <List className='w-full h-full overflow-y-scroll'>
              {
                recipe.ingredientLines.map((line, i) => (<ListItem key={i}><span className='mr-2 font-bold'>{i+1}.</span>{line}</ListItem>))
              }  
            </List>
          </div>
        </DialogBody>
        <DialogFooter className='flex flex-row-reverse items-center justify-between'>
          <div className='flex'>
            <Button
              variant="outlined"
              color="red"
              onClick={handleOpen}
              className="mr-1"
            >
              <span>Close</span>
            </Button>
            <Button variant="gradient" color="green" onClick={()=>{saveRecipe(recipe.uri)}}>
              <span>Save</span>
            </Button>
          </div>
          {
            window.location.href.split('/')[4] == 'profile' && 
            <Button
              variant="outlined"
              color="red"
              onClick={deleteRecipe}
              className="mr-1"
            >
              <span>Delete</span>
            </Button>
          }
        </DialogFooter>
      </Dialog>
  )
}

export default RecipeDialog
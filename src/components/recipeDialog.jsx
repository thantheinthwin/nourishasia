import React from 'react'
import {
    Dialog,
    DialogBody,
    DialogHeader,
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
  // console.log(recipe);
  const recipeObj = (({ label, ingredientLines, image, calories }) => ({ label, ingredientLines, image, calories }))(recipe);

  const deleteRecipe = async () => {
    try {
      deleteDoc(doc(db, 'recipes', recipe.id))
      .then(()=>{
        deleteObject(deleteRef)
        .then(()=>{
          handleOpen();
          navigate(0);
        })
        .catch((error)=>{console.error(error);})
      })
      .catch((error)=>{console.error(error);})
    } catch (error) {
      console.error(error);
    }
  }

  const saveRecipe = async (recipeObj) => {
    const uid = user?.uid;

    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const result = docSnap.data();
        let savedRecipes = result['savedRecipes'];
        if(!savedRecipes.includes(recipeObj)){
          savedRecipes.push(recipeObj);
          try {
            updateDoc(docRef, {
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

  const unsaveRecipe = async (recipeObj) => {
    const uid = user?.uid;

    try {
      const docRef = doc(db, 'users', uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const result = docSnap.data();
        let savedRecipes = result['savedRecipes'];
        // console.log('savedRecipes', savedRecipes);

        let index;
        savedRecipes.some((object, idx) => {
          if(object.label === recipeObj.label){
            index = idx;
            return true;
          }
        })
        // console.log(index);

        savedRecipes.splice(index, 1);
        // console.log('savedRecipes',savedRecipes);

        try {
          updateDoc(docRef, {
            savedRecipes: savedRecipes
          })
          .then(navigate(0))
        } catch (error) {
          console.error(error);
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
    <Dialog open={open} handler={handleOpen} className='max-h-[calc(100vh-2rem)]'>
        <DialogHeader>{recipe.label}</DialogHeader>
        <DialogBody divider className='grid gap-2 border-b-0'>
          <div className='grid gap-2 lg:flex'>
            <div className='flex items-center w-full gap-2 py-2 rounded-md justify-evenly lg:flex-col bg-blue-gray-50 md:bg-transparent md:justify-start'>
              <img src={recipe.image} alt="meal" className='object-cover w-20 h-20 rounded-md md:w-fit md:h-96' loading='lazy'/>
              <Typography variant='h5' className='text-accent'>{recipe.calories.toFixed(2)} calories</Typography>
            </div>
            <div className='flex flex-col w-full max-h-72 lg:max-h-96'>
              <Typography className='pl-6 text-xl font-bold uppercase text-accent'>Ingredients</Typography>
              <List className='w-full h-full overflow-y-scroll'>
                {
                  recipe.ingredientLines.map((line, i) => (<ListItem key={i}><span className='mr-2 font-bold'>{i+1}.</span>{line}</ListItem>))
                }  
              </List>
            </div>
          </div>
          <footer className='flex flex-row-reverse items-center justify-between pt-3 border-t'>
            <div className='flex'>
              <Button
                variant="outlined"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Close</span>
              </Button>
              { 
                window.location.href.split('/')[4] === 'recipes' &&
                <Button variant="gradient" color="green" onClick={()=>{saveRecipe(recipeObj)}}>
                  <span>Save</span>
                </Button>
              }
            </div>
            {
              window.location.href.split('/')[4] === 'profile' && 
              <Button
                variant="outlined"
                color="red"
                onClick={deleteRecipe}
                className="mr-1"
              >
                <span>Delete</span>
              </Button>
            }
            {
              window.location.href.split('/')[4] === 'savedRecipes' && 
              <Button
                variant="outlined"
                color="red"
                onClick={()=>{unsaveRecipe(recipeObj)}}
                className="mr-1"
              >
                <span>Unsave</span>
              </Button>
            }
          </footer>
        </DialogBody>
        
      </Dialog>
  )
}

export default RecipeDialog
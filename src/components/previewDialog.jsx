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

import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage, app, db } from '../config/firebase.config';
import { v4 } from 'uuid';
import { getAuth } from 'firebase/auth';
import { serverTimestamp, addDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const PreviewDialog = (props) => {
  const firebaseAuth = getAuth(app);
  const navigate = useNavigate();

  const {open, handleOpen, recipe, name, img} = {...props};

//   console.log('dish', dish)
  const handleSubmit = async (url, filename) => {    
    const uid = firebaseAuth.currentUser.uid;
    const ingredientLines = recipe.ingredients.map(line => line.text)
    const data = {
        label: name,
        calories: recipe.calories,
        image: url,
        ingredientLines: ingredientLines,
        source: uid,
        createdAt: serverTimestamp(),
        updatedAt: null,
        filename: filename
    }

    try {
        // console.log(data)
        const result = await addDoc(collection(db, 'recipes'), data);
        navigate("/home/profile", {replace: true});
        result.then(()=>{}).catch((error)=>console.error(error))
    } catch (error) {
        console.error("Error adding document: ", error);
    }
  }

  const uploadImage = () => {
    if(img == null) return;
    const filename = img.name + v4();
    const imageRef = ref(storage, `images/${filename}`);

    uploadBytes(imageRef, img)
    .then(() => {
        console.log('image uploaded');  
        getDownloadURL(imageRef)
        .then((url) => {
            console.log('url',url);
            handleSubmit(url,imageRef.name);
        })
        .catch((error) => console.log(error))
    })
    .catch((error) => alert(error))
  }

  return (
    <>
    <Dialog open={open} handler={handleOpen} className='max-h-[calc(90vh-2rem)]'>
        <DialogHeader>{name}</DialogHeader>
        <DialogBody divider className='grid gap-2 lg:flex'>
            <div className='flex items-center w-full gap-2 py-2 rounded-md justify-evenly lg:flex-col bg-blue-gray-50 md:bg-transparent md:justify-start'>
            <img src={URL.createObjectURL(img)} alt="meal" className='object-cover w-20 h-20 rounded-md md:w-fit md:h-96' loading='lazy'/>
            <Typography variant='h5' className='text-accent'>{recipe.calories.toFixed(2)} calories</Typography>
            </div>
            <div className='flex flex-col w-full max-h-72 lg:max-h-96'>
                <Typography className='pl-6 text-xl font-bold uppercase text-accent'>Ingredients</Typography>
                <List className='w-full h-full overflow-y-scroll'>
                    {
                    recipe.ingredients.map((line, i) => (<ListItem key={i}><span className='mr-2 font-bold'>{i+1}.</span>{line.text}</ListItem>))
                    }  
                </List>
            </div>
        </DialogBody>
        <DialogFooter>
            <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
            >
            <span>Close</span>
            </Button>
            <Button variant="gradient" color="green" onClick={uploadImage}>
            <span>Save</span>
            </Button>
        </DialogFooter>
    </Dialog>
    </>
  )
}

export default PreviewDialog
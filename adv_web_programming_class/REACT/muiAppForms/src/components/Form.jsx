import * as React from 'react';
import { TextField,Box,Stack,Button } from '@mui/material'
import {useForm} from "react-hook-form";
import {object,string,number} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

export default function Form() {
    const personSchema = object({
        first_name:string()
            .required("Please Submit First Name ")
            .max(5, "Must be less than 5 characters"),        
    });
    const {register,handleSubmit,setValue,watch,formState:{errors},
    } =useForm({resolver:yupResolver(personSchema
        )}); //watch will keep the values up to date

    const handleChange = (e)=>{
        setValue(e.target.name, e.target.value)
        console.log(watch("first_name"));
    };
    const onSubmit = (data)=>{
    console.log(data);
    }

    
    return (

    <Box //MUI version of Form )) Box ==Form
      component="form"
      sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
      noValidate
      autoComplete="off" onSubmit={handleSubmit(onSubmit)} // custom onSubmit
    >
      <TextField id="outlined-basic" label="First Name:" variant="outlined" 
      {...register("first_name")}
      onChange={handleChange}
      error={!!errors.first_name}
      helperText={errors.first_name?.message}
      />
      <Stack spacing={2} direction="row">
      <Button type="submit" variant="contained" color='success'>Success</Button>
      <Button type="reset" variant="outlined">Reset</Button>
    </Stack>
    </Box>
  );
}

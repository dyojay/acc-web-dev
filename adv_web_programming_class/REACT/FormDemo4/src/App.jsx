// import { useState } from 'react'
import {useForm} from "react-hook-form";
import {object,string,number} from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
// import './App.css'

function App() {
    const userSchema = object({
        fname:string()
            .required("Please Submit First Name ")
            .max(5, "Must be less than 5 characters"),
        lname:string()
            .required("Please Submit Last Name ")
            .min(1, "Must be at least one character")
            .max(6, "No more than 6 characters"),
        age:number()
            .required("Please input age")
            .min(18,"Must be at least 18 yr old")
            .max(100, "Must be less than 100 yr old"),
        email:string()
            .required("Please Submit Email "),
        password:string()
            .required("Please enter password ")
            .min(6, "Password must be more than 6 characters")
            .max(12, "Must be 12 characters or less")
    });
    //-------------------------------------------------------------------------------------------------------------------------------------------------------
    const {register,handleSubmit,setValue,reset,formState:{errors},
    } =useForm({resolver:yupResolver(userSchema
        )});

    const onSubmit = (data)=>{
        console.log(data);
        reset();
    };
    const handleChange=(event)=>{
        setValue(event.target.name,event.target.value)

    };
  return (
    <>

        <form onSubmit={handleSubmit(onSubmit)}>

            <label htmlFor="fname"> First Name: </label>
            <input type="text" {...register("fname")} id="fname" onChange={handleChange}  />
            {errors.fname && <span>{errors.fname.message}</span>}

            <label htmlFor="lname"> Last Name: </label>
            <input type="string" {...register("lname")} id="lname" onChange={handleChange}  />
            {errors.lname && <span>{errors.lname.message}</span>}

            <label htmlFor="age"> Age: </label>
            <input type="number" {...register("age")} id="age" onChange={handleChange}  />
            {errors.age && <span>{errors.age.message}</span>}
            <br/>

            <label htmlFor="email"> Email: </label>
            <input type="email" {...register("email")} id="email" onChange={handleChange}  />
            {errors.email && <span>{errors.email.message}</span>}

            <label htmlFor="password"> Password: </label>
            <input type="password" {...register("password")} id="pass" onChange={handleChange} autoComplete="off" />
            {errors.password && <span>{errors.password.message}</span>}

            <button type="submit">Submit</button>
        </form>
    </>
  )
}

export default App

type Person ={
    fname: string;
    lname:string;
    isMarried?: boolean;
    children: any[];
    getFullName?:() =>string;
    getAge: (num:number, fname:string)=> any;
}

    export {Person};
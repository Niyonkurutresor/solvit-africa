import mongoose from "mongoose";

 export const defaultData = 
[
    {
        name:'vilunga',
        location:'musanze',
        startLocation:{
            type:'Point',
            cordinates:[30.36788,44.20378],
            address:'kibagabaga',
            destination:'rukozo'
        },
        destinationLocation:[
            {
                _id:'6470738a34eda0850ec46357',
                type:'Point',
                cordinates:[32.23483,43.34839],
                description:'this is the geo locatioin data we are trying to figure out',
                day:2
            },
            {
                _id:'647076e1b6ea64c76c0c295d',
                type:'Point',
                cordinates:[32.23483,43.34839],
                description:'this is the geo locatioin data we are trying to figure out',
                day:2
            },
            {
                _id:'647076e1b6ea64c76c0c2962',
                type:'Point',
                cordinates:[32.23483,43.34839],
                description:'this is the geo locatioin data we are trying to figure out',
                day:2
            }
        ],
        price:40,
        ratings:5.4,
        createdAt: Date.now(),
        image:['./public/image/6.jpg','./public/image/7.jpg','./public/image/8.jpg'],
        startDate: [2023-4-13,2023-5-13,2023-7-13],
        duration:4,
        groupsize:16,
        summary:'this  tour it takes more than 4 hours hiking in the northen rwanda mountain',
        description: 'well come to rwanda tour gide, this tour will help you to exprore different area or musanze districet for few amount of money',
        imageCover:'./public/image/2.jpg'
    },
    {
        name:'Nyungwe national park',
        location:'Muhanga',
        price:60,
        ratings:6.4,
        createdAt: Date.now(),
        image:['./public/image/6.jpg','./public/image/7.jpg','./public/image/8.jpg'],
        startDate:[2024-1-13,2023-5-13,2025-12-13],
        duration:3,
        groupsize:20,
        summary:'this  tour it takes more than 6 km sercouring around forest',
        description:'the only thing you will be great full about your life is tour of to day. you will get the best exprerience of different birds, treases, kanopi, etc',
        imageCover:'./public/image/3.jpg'
    },
    {
        name:'Akagera national park',
        location:'Nyagatare',
        price:30,
        ratings:7.2,
        createdAt: Date.now(),
        image:['./public/image/6.jpg','./public/image/7.jpg','./public/image/8.jpg'],
        startDate: [2024-2-13,2023-5-13,2023-9-13],
        duration:7,
        groupsize:30,
        summary:'this  tour it takes more than 6 km sercouring around forest',
        description:'Paladize of rwanda. akageranational park is the only place in rwanda where you can find amazind and beatiful animals ',
        imageCover:'./public/image/4.jpg'
    },
    {
        name:'kabari',
        location:'rubavu',
        price:80,
        ratings:3.3,
        createdAt: Date.now(),
        image:['./public/image/6.jpg','./public/image/7.jpg','./public/image/8.jpg'],
        startDate: [2023-3-13,2023-5-13,2023-11-13],
        duration:6,
        groupsize:50,
        summary:'this  tour it takes more than 4 hours hiking in the northen rwanda mountain',
        description: 'well come to rwanda tour gide, this tour will help you to exprore different area or musanze districet for few amount of money',
        imageCover:'./public/image/2.jpg'
    },
    {
        name:'Nyabatare',
        location:'Nyagatare',
        price:60,
        ratings:6.8,
        createdAt:Date.now() ,
        image:['./public/image/6.jpg','./public/image/7.jpg','./public/image/8.jpg'],
        startDate: [2024-5-13,2023-7-13,2023-11-13],
        duration:7,
        groupsize:40,
        summary:'this  tour it takes more than 6 km sercouring around forest',
        description:'the only thing you will be great full about your life is tour of to day. you will get the best exprerience of different birds, treases, kanopi, etc',
        imageCover:'./public/image/3.jpg'
    },
    {
        name:'Gasabo',
        location:'Uinversity of rwanda',
        price:50,
        ratings:3.2,
        createdAt: Date.now(),
        image:['./public/image/6.jpg','./public/image/7.jpg','./public/image/8.jpg'],
        startDate: [2023-4-13,2023-5-13,2023-7-13],
        duration:2,
        groupsize:80,
        summary:'this  tour it takes more than 6 km sercouring around forest',
        description:'Paladize of rwanda. akageranational park is the only place in rwanda where you can find amazind and beatiful animals ',
        imageCover:'./public/image/4.jpg'
    }
]


// module.exports = {
//     defaultData
// }
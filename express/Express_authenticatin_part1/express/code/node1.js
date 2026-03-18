console.log("Hello welcome to node js  - Server side scripting")

a=20
b=30
console.log(a+b)




const Demo=(a=0,b=0)=>{
    return a+b;
}
console.log(Demo(20,30))

// callback function

function A(){
    console.log("Function A")
}

function B(callback){
        callback()
        console.log("Function B")
}

B(A)

const Calci=(a,b)=>{
    console.log(a+b)
    return a+b
}

const add=(callback,x,y)=>{

    const result=callback(30,30)+(x+y)
    console.log("Addition function",result)
}
add(Calci,100,200)

// Higher order function-
// 1- such a function which we passing one function into another function as a argument 
// ex- callback function

// 2- one function return another function
// ex- 

function Multi(x){

    return function B(y){
        console.log(x*y)
    }
}
Multi(20)(30)




// *****************************888


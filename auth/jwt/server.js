console.log('first')
let a = 2;
const hello = async()=>{
    for (let k = 0; k < 100000000; k++) {
        a= a+20
        
    }
    console.log(a)
}
hello()
console.log('its done')
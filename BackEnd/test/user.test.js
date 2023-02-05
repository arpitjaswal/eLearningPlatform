const request = require('supertest')
const app = require('../app')

test('Should create a new student',async ()=>{
    await request(app)
        .post("/user")
        .send({
            fname:"jay",
            lname:"radadiya",
            email:"jayradadiya81@gmail.com",
            password:"1234567",
            city:"surat"
        })
        .except(200);
})


test('should login',async()=>{
    await request(app)
        .post('/user/login')
        .send({
            email:"jayradadiya81@gmail.com",
            password:"1234567"
        })
        .except(200);
})
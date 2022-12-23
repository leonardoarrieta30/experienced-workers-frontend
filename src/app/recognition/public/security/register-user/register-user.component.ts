import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {User} from "../../../model/user";
import {Worker} from "../../../model/worker";
import {UsersService} from "../../../services/users.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})
export class RegisterUserComponent {

  form: FormGroup;
  userData: User;
  constructor(private formBuilder: FormBuilder, private userService: UsersService, private router: Router) {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.userData = {} as User;
  }

  // onSubmit() {
  //   if (this.form.valid) {
  //     const data = this.form.value;
  //     this.userService.create(this.userData).subscribe((response:any) => {
  //         console.log('Registro exitoso');
  //       },
  //       (error) => {
  //         console.error('Error al registrar:', error);
  //       }
  //     );
  //   }
  // }

  dataUser: any = {
    email:"",
    password: "",
  }
  next = true;
  hide = true;

  register(formTemplate: any){
    if(formTemplate.hasError('required') ){
      console.log("Something went wrong")
    }else{
      this.userService.getAll().subscribe((data)=>{
        // @ts-ignore
        data.content.map((e)=>{
          if(e.email === this.dataUser?.email){
            this.next = false;
          }
        })
        if(this.next){
          this.userService.create(this.dataUser).subscribe((response) =>{
            console.log(response);
          })
          // this.router.navigate(['login-dermatologist']).then();
          //localStorage.setItem("dermatologist", JSON.parse(this.dataDermatologist))
        }
        // @ts-ignore
        console.log(data.content);
        console.log(`registro exitoso`);
      })
    }
  }

}

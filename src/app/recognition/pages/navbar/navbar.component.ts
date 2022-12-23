import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkersService} from "../../services/workers.service";
import {MatDialog} from "@angular/material/dialog";
import {Worker} from "../../model/worker";
import {identifierName} from "@angular/compiler";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

  @Output() dataGender: EventEmitter<Object> = new EventEmitter<Object>();
  opened = false;
  data: any;
  constructor(private workersService: WorkersService) {

  }
  ngOnInit(): void{
    // this.getWorkersByMale();
    // this.getWorkersByFemale();
  }

  recibirObjecto(event: Object){
    this.data = event;
    // this.data2 = response;
    this.data = Object.values(this.data.content);
    console.log(this.data);
  }
  getAllWorkers(){
    this.workersService.getAll().subscribe(response=>{
      this.data = response;
      // this.data2 = response;
      this.data = Object.values(this.data.content);
      console.log(this.data);
    })
  }

  object:Object= {};
  getWorkersByMale(){
      // this.data2 = response;
      // this.data = Object.values(this.data.content);
    console.log(this.data);
      for(let i = 0; i < this.data.length; i++){
          if(this.data[i].gender === "M"){
            console.log(`Filter by gender male`);
            this.object = this.data[i];
            console.log(this.object);
          }
      }
      this.dataGender.emit(this.object);
      // console.log(this.data);

  }

  getWorkersByFemale(){
      // this.data2 = response;
      // this.data = Object.values(this.data.content);
      for(let i = 0; i < this.data.length; i++){
        if(this.data[i].gender === "F"){
          console.log(`Filter by gender female`);
          this.object = this.data[i];
          console.log(this.object);
        }
      }
      this.dataGender.emit(this.object);
      // console.log(this.data);
  }
}

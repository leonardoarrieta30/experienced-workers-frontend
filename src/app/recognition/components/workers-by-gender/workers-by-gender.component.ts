import {Component, OnInit} from '@angular/core';
import {WorkersService} from "../../services/workers.service";
import {MatDialog} from "@angular/material/dialog";
import {Worker} from "../../model/worker";

@Component({
  selector: 'app-workers-by-gender',
  templateUrl: './workers-by-gender.component.html',
  styleUrls: ['./workers-by-gender.component.css']
})
export class WorkersByGenderComponent implements OnInit{

  WorkerData: Worker;

  data: any;
  data2!:any[];
  ngOnInit(): void {

  }
  show(){
    this.getAllWorkers();
  }

  constructor(private workersService: WorkersService) {
    this.WorkerData = {} as Worker;
  }


  // getAllWorkersByGender(){
  //   this.workersService.getAll().subscribe(response=>{
  //     this.data2 = Object.values(this.data.content);
  //     let i = 0;
  //     for (i ; i< this.data2.length; i++){
  //       if (this.data.gender == "M"){
  //         this.data = response;
  //       }
  //       else {
  //         this.data = response;
  //       }
  //     }
  //     console.log(this.data2);
  //   })
  // }
  getAllWorkers(){
    this.workersService.getAll().subscribe(response=>{
      this.data = response;
      // this.data = Object.values(this.data.content);
      console.log(this.data);
    })
  }

  getByGender(){

  }

}

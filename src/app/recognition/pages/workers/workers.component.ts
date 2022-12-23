import {Component, EventEmitter, HostListener, Input, OnInit, Output, ViewChild} from '@angular/core';
import {WorkersService} from "../../services/workers.service";
import {Worker} from "../../model/worker";
import {NgForm} from "@angular/forms";
import { KeyValuePipe } from '@angular/common';
import * as _ from 'lodash';
import { compare } from 'fast-json-patch';
import {ArrayDataSource} from "@angular/cdk/collections";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {
  DialogContentExampleDialogComponent
} from "../../components/dialog-content-example-dialog/dialog-content-example-dialog.component";
import {sum} from "lodash";
import {Router} from "@angular/router";

@Component({
  selector: 'app-workers',
  templateUrl: './workers.component.html',
  styleUrls: ['./workers.component.css']
})
export class WorkersComponent implements OnInit{
  @Input() workers: Array<any> = [];


  @Output() dataGender: EventEmitter<Object> = new EventEmitter<Object>();
  WorkerData: Worker;

  data: any;

  worker: Worker | undefined;


  displayedColumns: string[] = ['id', 'name', 'lastname', 'workPosition', 'urlToImage', 'description', 'likes', 'age', 'Actions'];
  isEditMode = false;


  @ViewChild('workerForm', {static: false})
  WorkerForm!: NgForm;


  likes1!: number;
  data2: any ;

  constructor(private workersService: WorkersService, public dialog: MatDialog, private router: Router) {
    this.WorkerData = {} as Worker;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogDelete(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {
    this.dialog.open(DialogContentExampleDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    this.deleteItem(id);
  }

  editItem(element: Worker) {
    this.WorkerData = _.cloneDeep(element);
    this.isEditMode = true;
  }

  ngOnInit():void{
    this.getAllWorkers();
    // this.identifyLikesTeen()
    // this.winner();
    // for (let i in this.data){
    //   console.log(i + ":" + this.data[i]);
    // }
  }

  // recibirObjecto(evento: Object){
  //     this.data = Object;
  //     // this.data2 = response;
  //     // this.data = Object.values(this.data.content);
  //     console.log(this.data);
  // }
  getAllWorkers(){
    this.workersService.getAll().subscribe(response=>{
      this.data = response;
      // this.data2 = response;
      this.data = Object.values(this.data.content);
      console.log(this.data);
    })
  }


  object:Object= {};

  getWorkersByMale() {
    this.workersService.getAll().subscribe(response=>{
      this.data = response;
      // this.data2 = response;
      this.data = Object.values(this.data.content);
      for(let i = 0; i < this.data.length; i++){
        if(this.data[i].gender === "M"){
          console.log(`Filter by gender male`);
          this.object = this.data[i];
          console.log(this.object);
        }
      }
      this.dataGender.emit(this.object);
      // console.log(this.data);
    })

  }

  getWorkersByFemale() {
    this.workersService.getAll().subscribe(response=>{
      this.data = response;
      // this.data2 = response;
      this.data = Object.values(this.data.content);
      for(let i = 0; i < this.data.length; i++){
        if(this.data[i].gender === "F"){
          console.log(`Filter by gender female`);
          this.object = this.data[i];
          console.log(this.object);
        }
      }
      this.dataGender.emit(this.object);
      // console.log(this.data);
    })
  }

  Winner: any;
  dataOfWorkerWin: any


  winner(){
    // this.Winner = this.data;
    // for (let i = 0 ; i < this.Winner.length ; i++){
    //     console.log(this.Winner[i].likes);
    // }
      console.log(this.data);
    console.log("data length: "+ this.data.length);
      let mayor: any = 0;
      for(let i = 0; i< this.data.length; i++){
        // console.log("data length: "+ this.data.length);
        console.log(this.data[i].likes);
        if(this.data[i].likes > mayor)
          mayor = this.data[i].likes;
      }
      // let dataOfWorkerWin: any;
      for(let i = 0; i<this.data.length ; i++){
        // console.log("data length: "+ this.data.length);
        if(this.data[i].likes === mayor) {
          alert(`El empleado del año es ${this.data[i].name} ${this.data[i].lastname}`);
          this.dataOfWorkerWin = this.data[i];
          // console.log(dataOfWorkerWin);
        }
      }

    this.router.navigate(['/winner'], {queryParams: this.dataOfWorkerWin});
 }
  showDialog: boolean= false;
  deleteItem(id:number){
    // this.openDialogDelete('3000ms', '1500ms');
    // this.showDialog = !this.showDialog;
    this.workersService.delete(id).subscribe(() =>{
      this.data = this.data.filter((o: Worker) => {return o.id !== id? o : false;});
    });
    console.log(this.data);
    // alert(`Deleted Data with id ${id}`);
  }


  addWorker(){
    this.WorkerData.id=0
    this.workersService.create(this.WorkerData).subscribe((response: any) => {
      this.data.push({...response});
      this.data = this.data.map((o:any) => { return o });
    });
  }

  updateWorker(){
    this.workersService.update(this.WorkerData.id, this.WorkerData).subscribe((response: any) => {
      this.data = this.data.map((o:Worker) => {
        if(o.id === response.id){
            o = response;
        }
        return o;
      })
    });
  }

  workersByMale :any  = {};
  workersByFemale :any  = {};
  filterByGender(){
    // console.log(this.data);
    // console.log("data length: "+ this.data.length);
    let mayor: any = 0;
    for(let i = 0; i< this.data.length; i++){
      // console.log("data length: "+ this.data.length);
      // console.log(this.data[i].likes);
      if(this.data[i].gender === "M")
       this.workersByMale = this.data[i];
      else this.workersByFemale = this.data[i];
    }
  }

  getWorkerById(id:number){
    this.workersService.getById(id).subscribe(response =>{
      this.data = response;
      // this.data2 = Object.values(this.data.content);
      // this.data2.likes = this.data2.likes + 1 ;
    });
    // this.data2 = {};
    // console.log(this.data2);
  }

  showButtonFavorite: boolean = true;

  executed = false;

  @HostListener('click')
   updateWorkerLike(element: Worker){
    if (!this.executed) {
      if (element.likes < 10) {
        element.likes += 1;
        this.showButtonFavorite = true;
      }
      if (element.likes === 10) {
        this.winner();
        this.showButtonFavorite = false;
      }
      this.workersService.updateLikes(element.id, element).subscribe((response: any) => {
        this.data = this.data.map((o: Worker) => {
          // response.likes = 0;
          if (o.id === response.id) {
            o = response;
            // response.likes = 0;
          }
          // console.log(o);
          this.executed = true;
          return o;
        });
        // const index = this.data.findIndex(data => data.id === response.id);
        // this.data[index] = response;
      });
    }
    // this.data2 = [];
  }

  identifyLikesTeen(){
    for (let i = 0; i < this.data.length; i++){
      if(this.data[i].likes == 10)
      {
        console.log(`eres el ganador ${this.data[i].id}`);
      }
    }

  }

  cancelEdit(){
    this.isEditMode = false;
    this.WorkerForm.resetForm();
  }

  onSubmit() {
    if (this.WorkerForm.form.valid) {
      console.log('valid');
      if (this.isEditMode) {
        console.log('about to update');
        this.updateWorker();
      } else {
        console.log('about to add');
        this.addWorker();
      }
      this.cancelEdit();
    } else {
      console.log('Invalid data');
    }
  }



}


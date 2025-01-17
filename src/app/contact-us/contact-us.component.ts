import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { ControllerService } from '../services/controller.service';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';

import { Todo } from '../shared/models/todo';
import { Observable } from 'rxjs/internal/Observable';
import { lastValueFrom } from 'rxjs/internal/lastValueFrom';
import { TitleService } from '../services/title.service';
@Component({
  selector: 'contact-us',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule,AsyncPipe,MatToolbarModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})

export class ContactUsComponent implements OnInit{
  private controller: ControllerService = inject(ControllerService);
  private fb: FormBuilder = inject(FormBuilder);
  private titleService: TitleService = inject(TitleService);
  data: Todo[] = [];
  
  form = this.fb.group({
    name: ['', Validators.required],
    age: ['', [Validators.required, Validators.pattern("^[0-9]*$"),]],
    email: ['', Validators.email],
    phone: [''],
    message: ['', Validators.required]
  });
  minimized:boolean = true;
  dataArray:number[] = [];
  products$!:Observable<object>;

  ngOnInit(): void { 
    this.titleService.setTitle("New Title");
  }
  submit(){    
    let resp$ = this.controller.submit(this.form.value);
    lastValueFrom(resp$).then(
      data => console.log(data)
      );    
  }
  
  toggleMinimize(){
    this.minimized = !this.minimized;
  }
  dataBtnClicked(){
    const offset = Math.floor(Math.random() * 3) - 1;// -1 to 1
    const arr:number[] = [];
    for(let i = 0; i<(500 + offset); i++){
      let rand100 = Math.floor(Math.random()*100);
      arr.push(rand100);
    }
    let resp$ = this.controller.sendDataArr(arr);
    lastValueFrom(resp$).then(
      (data:number[]) => this.dataArray = data
      );    
  }
}
import { Component, OnInit, Output, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Project } from 'src/app/models/projects.model';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  
  
  projects: Project[];
  project;
  status: string;

  constructor(private _dataService: DataService) { }

  ngOnInit() {

    this._dataService
    .getProjects()
    .subscribe((data: Project[]) =>{
      this.projects = data['projects'];
    })
  }

}
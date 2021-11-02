import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Title} from "@angular/platform-browser";
import {MatDialog} from "@angular/material/dialog";
import {CheckingDetailComponent} from "../checking-detail/checking-detail.component";
import {Options} from "@angular-slider/ngx-slider";
import {CheckinService} from "../../services/checkin.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Subscription} from "rxjs";

export interface PeriodicElement {
  name: string;
  position: number;
  time: Date;
  status: string;
  temperature: number
  imageUrl: string
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  queryForm = new FormGroup(
    {
      timeMin: new FormControl(new Date()),
      timeMax: new FormControl(new Date()),
    },
  )

  filterForm = new FormGroup(
    {
      tempSlider: new FormControl([34, 43]),
      status: new FormControl("All"),
    },
  )
  displayedColumns: string[] = ['position', 'name', 'time', 'degree', 'status', 'image'];
  ELEMENT_DATA: PeriodicElement[] = [
    {
      position: 1,
      name: 'Nhan Tran',
      time: this.generateRandomDate(),
      status: 'Accept',
      temperature: 35.5,
      imageUrl: 'https://www.pyimagesearch.com/wp-content/uploads/2020/05/face_mask_detection_featured.jpg',
    },
    {
      position: 2,
      name: 'John Example',
      time: this.generateRandomDate(),
      status: 'Accept',
      temperature: 35.5,
      imageUrl: 'https://www.pyimagesearch.com/wp-content/uploads/2020/05/face_mask_detection_featured.jpg',
    },
    {
      position: 3,
      name: 'Thomas Flynn',
      time: this.generateRandomDate(),
      status: 'Denied',
      temperature: 38.5,
      imageUrl: 'https://www.pyimagesearch.com/wp-content/uploads/2020/05/face_mask_detection_featured.jpg',
    },
    {
      position: 4,
      name: 'Franky',
      time: new Date(),
      status: 'Accept',
      temperature: 35.5,
      imageUrl: 'https://www.pyimagesearch.com/wp-content/uploads/2020/05/face_mask_detection_featured.jpg',
    },
  ];
  dataSource = this.ELEMENT_DATA;

  statusList = [
    "All",
    "Accept",
    "Denied",
  ]

  sliderOption: Options = {
    floor: 30,
    ceil: 45,
  }

  status = 'Accept'
  private sub: Subscription | undefined;

  constructor(private checkinService: CheckinService, private dialog: MatDialog, private snackbar: MatSnackBar, private title: Title) {
    this.title.setTitle('Dashboard')
  }

  ngOnInit(): void {

    this.sub = this.filterForm.valueChanges.subscribe(value => this.filterChecking(value))
  }

  generateRandomDate() {
    return new Date();
  }

  openDialog() {
    this.dialog.open(CheckingDetailComponent, {
      width: '600px',
      height: '600px',
    })
  }

  onSubmit() {
    this.checkinService.getCheckinFromDateToDate(this.queryForm.value).subscribe(value => console.log(value))
  }

  filterChecking(formValue: any) {

  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe()
  }
}

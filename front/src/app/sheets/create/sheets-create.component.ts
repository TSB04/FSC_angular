import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SheetsService, AlertService } from '@app/_services';

@Component({
  templateUrl: './sheets-create.component.html',
})
export class CreateSheetsComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  submitted = false;
  title = 'Create Sheet';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private SheetsService: SheetsService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    const loggedInUser = JSON.parse(localStorage.getItem('user')!);
    this.form = this.formBuilder.group({
      ine: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      desc: ['',Validators.minLength(160)],
      published_date: ['', Validators.required],
      //set the owner to the logged in user
      owner: ['http://127.0.0.1:8000/users/' + loggedInUser.id + '/'],
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.SheetsService.create(this.form.value).subscribe({
      next: () => {
        this.alertService.success('Sheet created successfully', {
          keepAfterRouteChange: true,
        });
        this.router.navigate(['../home'], { relativeTo: this.route });
      },
      error: (error: string) => {
        this.alertService.error(error);
        this.loading = false;
      },
    });
      
  }
}

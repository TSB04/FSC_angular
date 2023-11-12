import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { SheetsService, AlertService } from '@app/_services';

@Component({
  templateUrl: './sheets-create.component.html',
})
export class CreateSheetsComponent implements OnInit {
  form!: FormGroup;
  ine!: string;
  loading = false;
  submitting = false;
  submitted = false;
  title!: string;
  action!: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private SheetsService: SheetsService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    const loggedInUser = JSON.parse(localStorage.getItem('user')!);
    this.form = this.formBuilder.group({
      ine: ['', Validators.required],
      title: ['', Validators.required],
      author: ['', Validators.required],
      desc: ['', Validators.minLength(160)],
      published_date: ['', Validators.required],
      stock: ['', Validators.required],
      //set the owner to the logged in user
      owner: ['http://127.0.0.1:8000/users/' + loggedInUser.id + '/'],
    });
    this.title = 'Create Sheet';
    this.action = 'Create';
    this.ine = this.router.url.split('/')[3];
    if (this.router.url.includes(this.ine)) {
      this.title = 'Edit Sheet';
      this.action = 'Update';
      this.loading = true;
      this.SheetsService.getById(this.ine)
        .pipe(first())
        .subscribe(x => {
          this.form.patchValue(x);
          this.loading = false;
        });
    }
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

    this.submitting = true;
    this.saveSheet().pipe(first()).subscribe({
      next: () => {
        this.alertService.success('Sheet saved', {
          keepAfterRouteChange: true,
        });
        this.router.navigateByUrl('../list');
      },
      error: (error: any) => {
        this.alertService.error(error);
        this.submitting = false;
      },
    });
  }
    private saveSheet() {
      return this.ine ? 
      this.SheetsService.update(this.ine!, this.form.value) 
      : this.SheetsService.create(this.form.value);
    }
}



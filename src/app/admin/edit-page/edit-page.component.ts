import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from './../../shared/interfaces';
import { ActivatedRoute, Params } from '@angular/router';
import { PostsService } from './../../shared/posts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { AlertService } from '../shared/services/alert.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss'],
})
export class EditPageComponent implements OnInit, OnDestroy {
  post: Post;
  id: '';
  form: FormGroup;
  submitted = false;
  updateSub: Subscription;

  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      text: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
    });

    this.route.params
      .pipe(
        switchMap((params: Params) => {
          this.id = params.id;
          return this.postsService.getById(params.id);
        })
      )
      .subscribe((post: Post) => {
        this.post = post;

        this.form.get('title').patchValue(post.title);
        this.form.get('text').patchValue(post.text);
        this.form.get('author').patchValue(post.author);
      });
  }

  ngOnDestroy(): void {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }

    this.submitted = true;

    const post: Post = {
      id: this.id,
      ...this.post,
      ...this.form.value,
    };

    this.updateSub = this.postsService.update(post).subscribe(() => {
      this.submitted = false;
      this.alertService.warning('Пост был обновлен');
    });
  }
}

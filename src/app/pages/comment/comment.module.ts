import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '@app_components/components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecordCommentsComponent } from './record-comments/record-comments.component';
import { CommentService } from '@app_services/comment/comment.service';
import { ToastrService } from 'ngx-toastr';

@NgModule({
  declarations: [RecordCommentsComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [RecordCommentsComponent],
  schemas: [],
  providers: [ToastrService, CommentService]
})
export class CommentModule { }

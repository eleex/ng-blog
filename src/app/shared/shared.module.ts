import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { QuillModule } from 'ngx-quill';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  imports: [HttpClientModule, QuillModule.forRoot()],
  exports: [HttpClientModule, QuillModule, LoadingComponent],
  declarations: [LoadingComponent],
})
export class SharedModule {}

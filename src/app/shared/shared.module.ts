// Angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Directives
import { AppDefaultColorDirective } from './directives/app-default-color.directive';

// Services
import { MessageService } from './services/message.service';

@NgModule({
  declarations: [
    AppDefaultColorDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    MessageService
  ],
})
export class SharedModule { }

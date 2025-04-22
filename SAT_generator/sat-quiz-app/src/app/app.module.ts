import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; 
import { SkillSelectorComponent } from './components/skill-selector/skill-selector.component';
import { QuestionViewerComponent } from './components/question-viewer/question-viewer.component';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AppComponent,
    SkillSelectorComponent,
    QuestionViewerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillSelectorComponent } from './components/skill-selector/skill-selector.component';
import { DifficultySelectorComponent } from './components/difficulty-selector/difficulty-selector.component';
import { QuestionViewerComponent } from './components/question-viewer/question-viewer.component';

const routes: Routes = [
  { path: '', component: SkillSelectorComponent },
  { path: 'difficulty/:skill', component: DifficultySelectorComponent },
  { path: 'quiz/:skill/:difficulty', component: QuestionViewerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

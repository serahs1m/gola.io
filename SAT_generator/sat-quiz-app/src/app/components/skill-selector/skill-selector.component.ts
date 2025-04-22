import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-skill-selector',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './skill-selector.component.html',
  styleUrls: ['./skill-selector.component.css']
})
export class SkillSelectorComponent implements OnInit {
  skills: string[] = [];
  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<any[]>('assets/sat_data.json').subscribe(data => {
      const skillSet = new Set<string>();
      for (const item of data) {
        if (item.skill) {
          skillSet.add(item.skill.trim());
        }
      }
      this.skills = Array.from(skillSet).sort();
    });
  }

  toSlug(text: string): string {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  }

  goToQuiz(skill: string) {
    const urlSafeSkill = this.toSlug(skill);
    this.router.navigate(['/difficulty', urlSafeSkill]);
  }
}
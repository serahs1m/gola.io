import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-difficulty-selector',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './difficulty-selector.component.html',
  styleUrls: ['./difficulty-selector.component.css']
})
export class DifficultySelectorComponent implements OnInit {
    skillSlug = '';
    difficulties: string[] = [];
  
    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private http: HttpClient
    ) {}
  
    ngOnInit(): void {
      this.skillSlug = this.normalizeSlug(this.route.snapshot.paramMap.get('skill') || '');
  
      this.http.get<any[]>('assets/sat_data.json').subscribe(data => {
        const uniqueDiffs = new Set<string>();
  
        for (const q of data) {
          const normalizedSkill = this.normalizeSlug(q.skill);
          if (normalizedSkill === this.skillSlug) {
            uniqueDiffs.add(q.difficulty?.trim());
          }
        }
  
        const desiredOrder = ['Easy', 'Medium', 'Hard'];
        this.difficulties = [...uniqueDiffs]
          .map(diff => diff?.trim())
          .filter(diff => diff && diff.length > 0)
          .sort((a, b) => desiredOrder.indexOf(a) - desiredOrder.indexOf(b));
  
        this.difficulties.push('Random');
      });
    }
  
    normalizeSlug(text: string): string {
        return (text || '')
          .replace(/\n/g, ' ')
          .replace(/–/g, '-')
          .replace(/\s+/g, ' ')
          .trim()
          .toLowerCase()
          .replace(/[^a-z0-9 -]/g, '')
          .replace(/\s+/g, '-')       
          .replace(/-+/g, '-');      
      }

    selectDifficulty(diff: string) {
      const diffSlug = diff.toLowerCase();
      this.router.navigate(['/quiz', this.skillSlug, diffSlug]);
    }
  }
  
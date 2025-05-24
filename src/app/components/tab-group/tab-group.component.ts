import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material/tabs';
import { ThemePalette } from '@angular/material/core';

export interface TabItem {
  label: string;
  content: any;
  icon?: string;
}

@Component({
  selector: 'app-tab-group',
  standalone: true,
  imports: [CommonModule, MatTabsModule],
  template: `
    <mat-tab-group
      [selectedIndex]="selectedIndex"
      (selectedIndexChange)="onTabChange($event)"
      [backgroundColor]="backgroundColor"
      [color]="color"
      [animationDuration]="animationDuration"
      class="custom-tab-group"
    >
      @for (tab of tabs; track tab.label) {
        <mat-tab>
          <ng-template mat-tab-label>
            @if (tab.icon) {
              <span class="material-icons tab-icon">{{tab.icon}}</span>
            }
            {{tab.label}}
          </ng-template>
          <div class="tab-content">
            <ng-container *ngTemplateOutlet="tab.content"></ng-container>
          </div>
        </mat-tab>
      }
    </mat-tab-group>
  `,
  styles: [`
    .custom-tab-group {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .tab-content {
      padding: 24px;
    }

    .tab-icon {
      margin-right: 8px;
      font-size: 20px;
    }

    ::ng-deep {
      .mat-mdc-tab-header {
        border-bottom: 1px solid #e0e0e0;
      }

      .mat-mdc-tab {
        min-width: 120px;
      }

      .mat-mdc-tab-label-container {
        background: #f5f5f5;
      }

      .mat-mdc-tab .mdc-tab__text-label {
        color: #666;
      }

      .mat-mdc-tab:not(.mat-mdc-tab-disabled).mdc-tab--active .mdc-tab__text-label {
        color: var(--primary-color);
      }

      .mat-mdc-tab-header-pagination-chevron {
        border-color: #666;
      }

      .mat-mdc-tab-group.mat-mdc-tab-group-stretch-tabs>.mat-mdc-tab-header .mat-mdc-tab {
        flex-grow: 1;
      }
    }
  `]
})
export class TabGroupComponent {
  @Input() tabs: TabItem[] = [];
  @Input() selectedIndex = 0;
  @Input() backgroundColor: ThemePalette = 'primary';
  @Input() color: ThemePalette = 'accent';
  @Input() animationDuration = '200ms';

  onTabChange(index: number): void {
    this.selectedIndex = index;
  }
}
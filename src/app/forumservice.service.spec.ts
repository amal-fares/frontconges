import { TestBed } from '@angular/core/testing';

import { ForumserviceService } from './forumservice.service';

describe('ForumserviceService', () => {
  let service: ForumserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForumserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

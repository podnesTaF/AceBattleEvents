import { Test, TestingModule } from '@nestjs/testing';
import { HashtagService } from './hashtag.service';

describe('HashtagService', () => {
  let service: HashtagService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HashtagService],
    }).compile();

    service = module.get<HashtagService>(HashtagService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

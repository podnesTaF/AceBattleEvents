import { Test, TestingModule } from '@nestjs/testing';
import { HashtagController } from './hashtag.controller';
import { HashtagService } from './hashtag.service';

describe('HashtagController', () => {
  let controller: HashtagController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HashtagController],
      providers: [HashtagService],
    }).compile();

    controller = module.get<HashtagController>(HashtagController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

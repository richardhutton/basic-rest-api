import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostModel } from './posts.interface';
import { PostsModule } from './posts.module';
import { PostsService } from './posts.service';

function throwsanerror() {
  throw new Error('error thrown');
}

describe('PostsController', () => {
  let controller: PostsController;
  let service: PostsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService]
    }).compile();

    controller = module.get<PostsController>(PostsController);
    service = module.get<PostsService>(PostsService)
  });
  

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });


  describe('findAll', () => {

    it('should return an array of posts', () => {
      const result: PostModel[] = [{
        id: 1, 
        date: new Date(),
        title: 'title',
        body: 'a body',
        category: 'test'
      }]

      const serviceSpy = jest.spyOn(service,'findAll').mockImplementation(()=>result)
      expect(controller.findAll()).toBe(result)  

      expect(controller.findAll()[0].category).toBe('test')
      expect(serviceSpy).toHaveBeenCalled()
    });
  });

  describe('Getting used to jest', () => {
    it('object assignment', () => {
      const data = {one: 1};
      data['two'] = 2;
      expect(data).toEqual({one: 1, two: 2});
      expect(data.one).not.toEqual(10)
    });

    it ('works with arrays', () => {
      const shoppingList = [
        'diapers',
        'kleenex',
        'trash bags',
        'paper towels',
        'milk',
      ];

      expect(shoppingList).toContain('milk');
    });
    
    it ('handles errors in tests', () => {
      expect(() => throwsanerror()).toThrow(Error);
    });
  });
});

describe('PostsController mocking out the service', () => {
  let controller: PostsController;
  let spyService: PostsService;
  
  beforeEach(async () => {
    
    // not you can swap out usefactory and actually implement a class instead 
    // ref https://nishabe.medium.com/unit-testing-a-nestjs-app-in-shortest-steps-bbe83da6408
 
    const mockService= {
      provide: PostsService,
      useFactory: () => ({
        dummy: jest.fn(() => 'mock from dummy'),
        findOne: jest.fn((id: number): PostModel => {
          console.log('dude')
          const p : PostModel = 
             {
               id: 1,
               date: new Date(),
               title: 'a title',
               category: 'skate',
               body: 'a body'

             };
          return p;
          })
        })
    }

           

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [PostsService, mockService]
    }).compile();
  
    controller = module.get<PostsController>(PostsController);
    spyService = module.get<PostsService>(PostsService)
  });


  it ('mocks out the service layer', () => {
    expect(controller.dummy()).toEqual('mock from dummy')
    const res: PostModel = controller.findOne(1)
    
  });

});


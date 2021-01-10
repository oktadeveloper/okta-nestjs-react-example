import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getToDoList(): any[] {
    return [
      {
        id: 1,
        text: 'Clean the dishes',
      },
      {
        id: 2,
        text: 'Cook Dinner',
      },
      {
        id: 3,
        text: 'Take out the trash',
      },
      {
        id: 4,
        text: 'Legdrop off the ropes',
      },
      {
        id: 5,
        text: 'Brush your teeth',
      },
    ];
  }

  markAsComplete(id: any): any {
    console.log(id);

    return {
      success: true,
      error: '',
    };
  }
}

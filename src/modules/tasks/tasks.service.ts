import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  // Cron 5:00 AM everyday
  @Cron('* 00 05 * * *')
  handleCron() {
    this.logger.debug('Called when the current second is 45');
  }
}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RegisterSubjectModule } from './modules/register-subject.module';

@Module({
  imports: [
    RegisterSubjectModule,
    MongooseModule.forRoot(
      'mongodb+srv://sooa_mongo_admin:4MbzZzD9ykOMrvLo@sooa-mongo-cluster.lrlq0px.mongodb.net/SOOA_subjects_db?retryWrites=true&w=majority',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

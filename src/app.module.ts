import { Module } from '@nestjs/common';
import { JuegosModule } from './juegos/juegos.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriasModule } from './categorias/categorias.module';
import { PlataformasModule } from './plataformas/plataformas.module';
import { EditorialesModule } from './editoriales/editoriales.module';
import { DesarrolladoresModule } from './desarrolladores/desarrolladores.module';
import { SeedController } from './seed/seed.controller';
import { SeedModule } from './seed/seed.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type:'mysql',
      host: 'localhost',
      port: 3307,
      username: 'user_crud',
      password: 'root',
      database: 'db_crud',
      autoLoadEntities: true,
      synchronize: true,
    }),
    JuegosModule,
    CategoriasModule,
    PlataformasModule,
    EditorialesModule,
    DesarrolladoresModule,
    SeedModule,
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { CoffeesModule } from "./coffees/coffees.module";
import * as process from "process";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DateScalar } from "./common/scalars/date.scalar";
import { Tea } from "./teas/entities/tea.entity";
import { DrinksResolver } from "./drinks/drinks.resolver";
import { PubSubModule } from "./pub-sub/pub-sub.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: "postgres",
      autoLoadEntities: true,
      synchronize: true
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      buildSchemaOptions: {
        orphanedTypes: [Tea]
      },
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      installSubscriptionHandlers: true
    }),
    CoffeesModule,
    PubSubModule
  ],
  controllers: [AppController],
  providers: [AppService, DateScalar, DrinksResolver]
})
export class AppModule {
}

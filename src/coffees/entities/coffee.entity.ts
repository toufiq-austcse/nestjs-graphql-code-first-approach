import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Flavor } from "./flavor.entity";
import { Drink } from "../../common/interface/drink.interface";
import { CoffeeType } from "../enums/coffee-type.enum";
import { loggerMiddleware } from "../../common/middleware/logger.middleware";

@Entity()
@ObjectType({ description: "Coffee Model", implements: () => Drink })
@ObjectType({ description: "Coffee Model" })
export class Coffee implements Drink {

  @PrimaryGeneratedColumn()
  @Field(() => ID, { description: "A unique identifier" })
  id: number;

  @Field({ middleware: [loggerMiddleware] })
  @Column()
  name: string;

  @Column()
  brand: string;

  @Column({
    nullable: true
  })
  type: CoffeeType;

  @JoinTable()
  @ManyToMany(() => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors?: Flavor[];


  @CreateDateColumn()
  createdAt?: Date;
}
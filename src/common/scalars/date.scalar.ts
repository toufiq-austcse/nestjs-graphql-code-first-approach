import { CustomScalar, Scalar } from "@nestjs/graphql";
import { Kind, ValueNode } from "graphql/language";

@Scalar("Date", () => Date)
export class DateScalar implements CustomScalar<number, Date> {
  description = "Date custom scalar type";

  parseLiteral(ast: ValueNode): Date {
    if (ast.kind === Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  }

  parseValue(inputValue: number): Date {
    return new Date(inputValue);
  }

  serialize(value: Date): number {
    console.log("serialising ... ", value);
    return value.getTime();
  }


}

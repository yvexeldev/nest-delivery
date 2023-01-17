import { InternalServerErrorException } from "@nestjs/common";

export const errorHandler = (e: Error) => {
  console.log(e);
  throw new InternalServerErrorException(e.message);
};

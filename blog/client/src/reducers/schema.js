import { schema } from "normalizr";

const user = new schema.Entity("users", {}, { idAttribute: "_id" });

export const article = new schema.Entity(
  "articles",
  {
    author: user
  },
  { idAttribute: "_id" }
);

import { BaseEntity, Column, Entity, ObjectIdColumn } from "typeorm";

@Entity('book')
export default class Book extends BaseEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  author: string;
}

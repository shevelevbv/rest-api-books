import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity('user')
export default class User extends BaseEntity {
  @ObjectIdColumn()
  id: string;

  @Column()
  username: string;
}
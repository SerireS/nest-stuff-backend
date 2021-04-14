import {
  Column,
  Entity,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ unique: true })
  public nickname: string;

  @OneToMany(() => Message, (message: Message) => message.client)
  public messages: Message[];
}

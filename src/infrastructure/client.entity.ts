import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Client {
  @PrimaryColumn({ unique: true })
  public id: string;

  @Column({ unique: true })
  public nickname: string;

  @OneToMany(() => Message, (message: Message) => message.client)
  public messages: Message[];
}

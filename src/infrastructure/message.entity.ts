import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Client } from './client.entity';

@Entity()
export class Message {
  @PrimaryColumn({ unique: false })
  public message: string;

  @ManyToOne(() => Client, (client: Client) => client.messages)
  public client: Client;

  @Column({ unique: false, type: 'bigint' })
  public date: number;
}
